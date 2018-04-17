<template lang="html">
  <div :class="classNames" @click="handleClick">
      {{ day.format('D') }}
  </div>
</template>

<script>
export default {
    props: [ 'day' ],
    computed: {
        classNames() {
            let today = this.day.isSame(this.$moment(), 'day');
            return {
                day: true,
                today,
                past: this.day.isSameOrBefore(this.$moment(), 'day') && !today
            }
        }
    },
    methods: {
        handleClick(event) {
            console.log(event);
            const { clientX, clientY } = event;
            this.$store.commit('eventFormPosition', { eventFormX: clientX, eventFormY: clientY });
            this.$store.commit('showEventForm', true);
        }
    }
}
</script>

<style lang="css">
</style>
