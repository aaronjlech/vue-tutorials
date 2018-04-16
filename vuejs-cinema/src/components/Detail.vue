<template>
    <div id="details" v-if="movie">
        <movie-item v-bind:movie="movie"></movie-item>
    </div>
</template>

<script>
    import MovieItem from './MovieItem.vue';

    export default {
        props: ['movies'],
        computed: {
            movie() {
                const { id } = this.$route.params;
                console.log(id);
                let movieDetails = this.movies.find(movie => movie.id === id);
                return movieDetails ? movieDetails.movie : null;
            }
        },
        created() {
            console.log(this.$route);
        },
        components: {
            MovieItem
        }
    }
</script>
