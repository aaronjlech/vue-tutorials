<template>
    <div id="overview">
        <day-select v-bind:selected="day"></day-select>
        <div class="main">
            <movie-list v-bind:genre="genre" :movies="movies" :day="day" :time="time"></movie-list>
            <movie-filter></movie-filter>
        </div>
    </div>
</template>

<script>

import DaySelect from './DaySelect.vue';
import MovieFilter from './MovieFilter.vue';
import MovieList from './MovieList.vue';

    export default {
        props: [ 'genre', 'time', 'movies', 'day'],
        components: {
            DaySelect,
            MovieList,
            MovieFilter,
        },
    }
</script>
