<template>
  <div id="movie-filter">
      <h2>Filter Results</h2>
      <h3>By time of day</h3>
      <div class="filter-group">
          <check-filter v-for="time in times" v-bind:title="time" category="time" v-on:check-filter="checkFilter" />
      </div>
      <h3>By Genre</h3>
      <div class="filter-group">
          <check-filter v-for="genre in genres" v-bind:title="genre" category="genre" v-on:check-filter="checkFilter" />
      </div>
  </div>
</template>

<script type = "text/javascript" >
import genres from '../util/genres';
import times from '../util/times';
import CheckFilter from './CheckFilter.vue';

export default {
    data() {
        return {
            genres,
            times
        }
    },
    props: [ 'genre', 'time' ],
    methods: {
        checkFilter(category, title, checked) {
            console.log(category, title, checked);
            this.$emit('check-filter', category, title, checked);
        }
    },
    components: {
        CheckFilter
    }
};
</script>
