<template>
    <div class="movie-sessions">
        <div v-for="session in filteredMovieTimes(sessions)" class="session-time-wrapper">
            <div class="session-time">
                {{ formatMovieTime(session.time) }}
            </div>
        </div>
    </div>
</template>
