import Vue from "vue";
import moment from "moment-timezone";
import './style.scss';

import App from "./components/App.vue";
import store from './store';
Object.defineProperty(Vue.prototype, "$moment", {
    get() {
        return this.$root.moment;
    }
});

new Vue({
    el: "#app",
    data: {
        moment
    },
    components: {
        App
    },
    store
});
