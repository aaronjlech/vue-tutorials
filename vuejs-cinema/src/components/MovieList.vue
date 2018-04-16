<template>
  <div id="movie-list">
      <div v-if="filteredMovies.length">
          <movie-item v-for="movie in filteredMovies" v-bind:key="movie.id" :movie="movie.movie">
              <div class="movie-sessions">
                  <div v-for="session in filteredMovieTimes(movie.sessions)" class="session-time-wrapper">
                      <div class="session-time">
                          {{ formatMovieTime(session.time) }}
                      </div>
                  </div>
              </div>
          </movie-item>
      </div>
      <div v-else-if="movies.length">
          {{ noResults }}
      </div>
      <div v-else>
          Loading...
      </div>
  </div>
</template>

<script>
import MovieItem from './MovieItem.vue';
import genres from '../util/genres';
import times from '../util/times';
import moment from 'moment-timezone';

export default {

    props: [ 'genre', 'time', 'movies', 'day'],
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
        },
        formatMovieTime(time) {
            return moment(time).format('h:mm A');
        },
        filteredMovieTimes(sessions) {
            return sessions.filter(this.sessionPassesTimeFilter);
        },
        sessionPassesTimeFilter(session) {
            if (!this.day.isSame(moment(session.time), 'day')) {
                return false;
            } else if (this.time.length === 0 || this.time.length === 2) {
                return true
            } else if (this.time[0] === times.AFTER_6PM) {
                return moment(session.time).hour() >= 18;
            } else {
                return moment(session.time).hour() < 18;
            }
        }
    },
    computed: {
        filteredMovies() {
            return this.movies
                        .filter(this.moviePassesGenreFilter)
                        .filter(movie => movie.sessions.find(this.sessionPassesTimeFilter));
        },
        noResults() {
            let times = this.time.join(', ');
            let genres = this.genre.join(', ');
            return `No results for ${times} ${ times.length && genres.length ? ', ' : '' } ${genres}.`
        }
    },
    components: {
        MovieItem,
    }
};
</script>
