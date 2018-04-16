<template>
  <div id="movie-list">
      <div v-if="filteredMovies.length">
          <movie-item v-for="movie in filteredMovies" v-bind:key="movie.id" :movie="movie.movie" >
          </movie-item>
      </div>
      <div v-else-if="movies.length">
          No results
      </div>
      <div v-else>
          Loading...
      </div>
  </div>
</template>

<script>
import MovieItem from './MovieItem.vue';
import genres from '../util/genres';

export default {

    props: [ 'genre', 'time', 'movies' ],
    methods: {
        moviePassesGenreFilter(movie) {
            if(!this.genre.length) {
                return true
            } else {
                let movieGenres = movie.movie.Genre.split(", ");
                let matched = true;
                this.genre.forEach(genre => {
                    if(!movieGenres.includes(genre)) {
                        matched = false;
                    }
                })
                return matched;
            }
        }
    },
    computed: {
        filteredMovies() {
            return this.movies.filter(this.moviePassesGenreFilter);
        }
    },
    components: {
        MovieItem,
    }
};
</script>
