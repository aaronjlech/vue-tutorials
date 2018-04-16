<template>
    <div id="day-select">
        <ul class="days">
            <li class="day" v-for="day in days" v-bind:key="day._d">
                {{ formatDay(day) }}
            </li>
        </ul>
    </div>
</template>
<script>
import moment from 'moment-timezone';

    export default {
        data() {
            return {
                days: [0, 1, 2, 3, 4, 5, 6].map(num => moment().add(num, 'days'))
            }
        },
        methods: {
            formatDay(day) {
                let formattedDay = day.format('ddd MM/DD');
                return moment().format('ddd MM/DD') === formattedDay ? 'Today' : formattedDay;
            }
        }
    }
</script>
