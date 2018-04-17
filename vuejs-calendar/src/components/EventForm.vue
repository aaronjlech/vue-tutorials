<template lang="html">
    <div id="event-form" :class="{ active }" :style="{ top, left }">
        <h4>Add an Event</h4>
        <button id="close-button" @click="handleClose">&#10005</button>
    </div>
</template>

<script>
export default {
    computed: {
        active() {
                return this.$store.state.showEventForm;

        },
        top() {
            return `${this.$store.state.eventFormY}px`
        },
        left() {
            return `${this.$store.state.eventFormX}px`
        },
    },
    methods: {
        handleClose() {
            console.log('hello');
            this.$store.commit('showEventForm', false);
        }
    }
}
</script>

<style lang="css">
</style>
