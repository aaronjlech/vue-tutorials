<template>
    <div id="overview">
        <div class="main">
            <movie-list v-bind:genre="genre" :movies="movies" :day="day" :time="time"></movie-list>
            <movie-filter></movie-filter>
        </div>
    </div>
</template>

<script>
import MovieFilter from './MovieFilter.vue';
import MovieList from './MovieList.vue';

    export default {
        props: [ 'genre', 'time', 'movies', 'day'],
        components: {
            MovieList,
            MovieFilter,
        },
    }
</script>
