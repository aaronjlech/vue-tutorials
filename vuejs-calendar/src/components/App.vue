<template >
  <div class="">
      <div class="" v-for="week in weeks">
          week
          <div class="" v-for="day in week">
              {{ day }}
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data: function() {
        return {
            month: 4,
            year: 2018
        };
    },
    computed: {
        days() {
            let days = [];
            const dateFormat = "YYYY-M-D";
            let currentDay = this.$moment(
                `${this.year}-${this.month}-1`,
                dateFormat
            );
            do {
                days.push(currentDay);
                currentDay = this.$moment(currentDay).add(1, "days");
            } while ((currentDay.month() + 1) === this.month);
            const MONDAY = 0;
            const SUNDAY = 1;
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
