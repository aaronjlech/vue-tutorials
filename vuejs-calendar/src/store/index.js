import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentYear: 2018,
        currentMonth: 4,
        eventFormX: 0,
        eventFormY: 0,
        showEventForm: false
    },
    mutations: {
        setCurrentMonth(state, month) {
            state.currentMonth = month;
        },
        setCurrentYear(state, year) {
            state.currentYear = year;
        },
        eventFormPosition(state, { eventFormX, eventFormY }) {
            state.eventFormX = eventFormX;
            state.eventFormY = eventFormY;
            console.log(state);
        },
        showEventForm(state, payload) {
            console.log('owefrjoj');
            state.showEventForm = payload;
        }
    }
});
