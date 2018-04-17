<template>
  <div class="">
      {{ formattedDate }}
      <button type="button" @click="dec">-</button>
      <button type="button" @click="inc">+</button>
  </div>
</template>

<script>
export default {
    computed: {
        formattedDate() {
            return this.$moment(
                `${this.year}-${this.month}-1`,
                "YYYY-M-D"
            ).format("MMMM YYYY");
        },
        month() {
            return this.$store.state.currentMonth;
        },
        year() {
            return this.$store.state.currentYear;
        }
    },
    methods: {
        dec() {
            let month = this.month - 1
            if (month < 1) {
                month = 12
                this.setYear(this.year - 1);
            }
            this.setMonth(month);
        },
        inc() {
            let month = this.month + 1
            if(month > 12) {
                month = 1;
                this.setYear(this.year + 1);
            }
            this.setMonth(month);
        },
        setMonth(month) {
            this.$store.commit('setCurrentMonth', month);
        },
        setYear(year) {
            this.$store.commit('setCurrentYear', year);
        }
    }
};
</script>

<style lang="css">
</style>
