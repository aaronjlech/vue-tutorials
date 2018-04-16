import Vue from 'vue';
import VueResource from 'vue-resource';

import './style.scss';

import MovieFilter from './components/MovieFilter.vue';
import MovieList from './components/MovieList.vue';


Vue.use(VueResource);

new Vue({
    el: "#app",
    data: {
        genre: [],
        time: [],
        movies: []
    },
    created() {
        this.$http.get('/api').then(response => {
            this.movies = response.data;
        }).catch(err => console.log(err));
    },
    methods: {
        checkFilter(category, title, checked) {
            if (checked) {
                this[category].push(title);
            } else {
                let index = this[category].indexOf(title);
                if (index > -1) {
                    this[category].splice(index, 1);
                }
            }
        }
    },
    components: {
        MovieList,
        MovieFilter,
    },
})
