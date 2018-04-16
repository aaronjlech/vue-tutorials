import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import moment from 'moment-timezone';

import './style.scss';

import routes from './routes';
import { checkFilter } from './util/bus';


Vue.use(VueResource);
Vue.use(VueRouter);
const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', { get() { return this.$root.bus } });
const router = new VueRouter({ routes });
new Vue({
    el: "#app",
    data: {
        genre: [],
        time: [],
        movies: [],
        day: moment(),
        bus,
    },
    created() {
        this.$http.get('/api').then(response => {
            this.movies = response.data;
        }).catch(err => console.log(err));
        //subscribe global Vue eventListener
        this.$bus.$on('check-filter', checkFilter.bind(this));
    },
    router,
})
