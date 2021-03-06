new Vue({
    el: "#app",
    data: {
        total: 0,
        items: [],
        cart: [],
        results: [],
        search: "dinosaurs",
        lastSearch: "",
        loading: true,
        perPage: 10
    },
    computed: {
        noMoreItems() {
            return (
                this.results.length === this.items.length && this.results.length
            );
        }
    },
    mounted() {
        this.onSubmit();
        let $scrollElement = document.getElementById("product-list-bottom");
        let watcher = scrollMonitor.create($scrollElement);
        watcher.enterViewport(() => {
            this.appendItems();
        });
    },
    methods: {
        onSubmit: function() {
            if (this.newSearch) {
                this.loading = true;
                this.$http.get(`/search/${this.search}`).then(function(res) {
                    this.loading = false;
                    this.lastSearch = this.search;
                    this.search = "";
                    this.results = res.data.map(imgur => {
                        const dollar = Math.floor(Math.random() * 60) + 6;
                        const cent = Math.round(Math.random() * 100) / 100;
                        imgur.price = dollar + cent;
                        return imgur;
                    });
                    this.items = this.results.slice(0, this.perPage);
                });
            }
        },
        addItemToCart: function(itemToAdd) {
            let itemInCart = this.cart.find(item => item.id === itemToAdd.id);
            if (itemInCart) {
                itemInCart.qty += 1;
                // this.cart = this.cart.map(item => item.id === itemInCart.id ? { ...item, qty: item.qty += 1 } : item );
            } else {
                this.cart.push({
                    ...itemToAdd,
                    qty: 1
                });
            }
            this.setCartTotal();
        },
        setCartTotal: function() {
            let newTotal = 0;
            this.cart.forEach(item => (newTotal += item.price * item.qty));

            this.total = Math.round(newTotal * 100) / 100;
        },
        updateQty: function(item, qty) {
            if (qty == 0) {
                this.cart = this.cart.filter(
                    cartItem => cartItem.id !== item.id
                );
            }
            if (qty > 0) {
                item.qty = qty;
            }
        },
        appendItems: function() {
            if (this.items.length < this.results.length) {
                let itemsToAdd = this.results.slice(
                    this.items.length,
                    this.items.length + this.perPage
                );
                this.items = [...this.items, ...itemsToAdd];
            }
        }
    },
    filters: {
        currency: function(price) {
            let priceString = price.toString();
            let cents = priceString.split(".")[1] || "";
            if (cents.length === 0) {
                priceString += ".00";
            } else if (cents.length === 1) {
                priceString += "0";
            }

            return `$${priceString}`;
        }
    }
});
