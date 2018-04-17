<template >
    <div class="">
        <div id="header">
            <div>
                <h1>Vue.js Calendar</h1>
            </div>
            <div>
                <current-month></current-month>
            </div>
        </div>
        <div id="day-bar">
            <div class="">
                Mon
            </div>
            <div class="">
                Tue
            </div>
            <div class="">
                Wed
            </div>
            <div class="">
                Thu
            </div>
            <div class="">
                Fri
            </div>
            <div class="">
                Sat
            </div>
            <div class="">
                Sun
            </div>
        </div>
        <div id="calendar">

            <div class="" v-for="week in weeks" class="calendar-week">
                <calendar-day v-for="day in week" :day="day">

                </calendar-day>
            </div>
        </div>
        <event-form></event-form>
    </div>
</template>

<script>
import CalendarDay from './CalendarDay.vue';
import CurrentMonth from './CurrentMonth.vue';
import EventForm from './EventForm.vue';

export default {
    components: {
        CalendarDay,
        CurrentMonth,
        EventForm
    },
    computed: {
        month() {
            return this.$store.state.currentMonth
        },
        year() {
            return this.$store.state.currentYear
        },
        days() {
            let days = [];
            const dateFormat = "YYYY-M-D";
            let currentDay = this.$moment(
                `${this.year}-${this.month}-1`,
                dateFormat
            );
            console.log(currentDay);
            do {
                days.push(currentDay);
                currentDay = this.$moment(currentDay).add(1, "days");
            } while (currentDay.month() + 1 === this.month);
            const MONDAY = 1;
            const SUNDAY = 0;
            currentDay = this.$moment(days[0]);

            if (currentDay !== MONDAY) {
                do {
                    currentDay = this.$moment(currentDay).subtract(1, "days");
                    days.unshift(currentDay);
                } while (currentDay.day() !== MONDAY);
            }
            do {
                currentDay = this.$moment(currentDay).add(1, "days");
                days.push(currentDay);
            } while (currentDay.day() !== SUNDAY);
            console.log(days);
            return days;
        },
        weeks() {
            let week = [];
            let weeks = [];
            for (let i = 0; i < this.days.length; i++) {
                week.push(this.days[i]);
                if (week.length === 7) {
                    weeks.push(week);
                    week = [];
                }
            }
            return weeks;
        }
    }
};
</script>

<style lang="css">
</style>
