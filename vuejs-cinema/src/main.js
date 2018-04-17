import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import moment from 'moment-timezone';

import './style.scss';

import routes from './routes';
import { checkFilter, setDay } from './util/bus';
import { hasClass, removeClass, addClass } from './util/helpers';

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
        this.$bus.$on('set-day', setDay.bind(this));
    },
    router,
})

Vue.directive('tooltip', {
    bind(el, bindings) {
        let span = document.createElement('SPAN');
        addClass(span, 'tooltip');
        let text = document.createTextNode('Seats available: 200');
        span.appendChild(text);
        el.appendChild(span);
        let div = el.getElementsByTagName('DIV')[0];
        div.addEventListener('mouseover', function() {
            let span = event.target.parentNode.getElementsByTagName('SPAN')[0]
            addClass(span, 'tooltip-show')
        })
        div.addEventListener('mouseout', function() {
            let span = event.target.parentNode.getElementsByTagName('SPAN')[0]
            removeClass(span, 'tooltip-show')

        })
    },
    unbind(el) {

    }
})
