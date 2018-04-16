<template>
  <div id="movie-filter">
      <h2>Filter Results</h2>
      <div class="filter-group">
          <check-filter v-for="genre in genres" v-bind:title="genre" v-on:check-filter="checkFilter" />
      </div>
  </div>
</template>

<script type = "text/javascript" >
import genres from '../util/genres';
import CheckFilter from './CheckFilter.vue';
export default {
    data() {
        return {
            genres
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
