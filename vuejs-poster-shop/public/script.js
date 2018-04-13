new Vue({
    el: '#app',
    data: {
        total: 0,
        items: [],
        cart: [],
        search: 'dinosaurs',
        lastSearch: '',
        loading: true,
    },
    mounted: function() {
        this.onSubmit();
    },
    methods: {
        onSubmit: function() {
            this.loading = true;
            this.$http.get(`/search/${this.search}`)
                .then(function(res) {
                    this.loading = false;
                    this.lastSearch = this.search;
                    this.search = "";
                    this.items = res.data.map(imgur => {
                        imgur.price = Math.floor(Math.random() * 30) + 6;
                        return imgur;
                    })
                })
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
                })
            }
            this.setCartTotal();
        },
        setCartTotal: function() {
            let newTotal = 0;
            this.cart.forEach(item => newTotal += (item.price * item.qty));
            this.total = newTotal;
        },
        updateQty: function(item, qty) {
            if(qty == 0) {
                this.cart = this.cart.filter(cartItem => cartItem.id !== item.id);
            }
            if(qty > 0) {
                item.qty = qty;
            }
        }
    },
    filters: {
        currency: function(price) {
            return `$${price}`;
        }
    }
})
