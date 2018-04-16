<template>
    <div id="day-select">
        <ul class="days">
            <li v-bind:class="{ day: true, active: isActive(day) }" v-for="day in days" v-on:click="setSelected(day)">
                {{ formatDay(day) }}
            </li>
            <li class="day-selector">
                <span class="dec" v-on:click="changeDay(-1)"></span>
                <span class="inc" v-on:click="changeDay(1)"></span>
            </li>
        </ul>
    </div>
</template>
<script>
import moment from 'moment-timezone';

    export default {
        props: ['selected'],
        data() {
            return {
                days: [0, 1, 2, 3, 4, 5, 6].map(num => moment().add(num, 'days'))
            }
        },
        methods: {
            formatDay(day) {
                let formattedDay = day.format('ddd MM/DD');
                return moment().format('ddd MM/DD') === formattedDay ? 'Today' : formattedDay;
            },
            isActive(day) {
                return day.isSame(this.selected, 'day');
            },
            setSelected(day) {
                console.log(day);
                this.$bus.$emit('set-day', day);
            },
            changeDay(change) {
                console.log(change);
                let newDay = moment(this.selected).add(change, 'days');
                if (this.days.find(day => day.isSame(newDay, 'day'))) {
                    this.setSelected(newDay);
                }
            }
        }
    }
</script>
