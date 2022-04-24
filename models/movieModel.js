const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    plot: {
        type: String,
        required: true
    },
    genres: {
        type: Array,
        required: true
    },
    runtime: {
        type: Number,
        required: true
    },
    cast: {
        type: Array,
        required: false
    },
    num_mflix_comments: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    fullplot: {
        type: String,
        required: false
    },
    countries: {
        type: Array,
        required: true
    },
    released: {
        type: Date,
        required: true
    },
    directors: {
        type: Array,
        required: true
    },
    rated: {
        type: String,
        required: true
    },
    awards: {
        wins: {
            type: Number,
            required: true
        },
        nominations: {
            type: Number,
            required: true
        },
        text: {
            type: String,
            required: true
        },
    },
    lastupdated: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    imdb: {
        rating: {
            type: Number,
            required: true
        },
        votes: {
            type: Number,
            required: true
        },
        id: {
            type: Number,
            required: true
        }
    },
    type: {
        type: String,
        required: true
    },
    tomatoes: {
        viewer: {
            rating: {
                type: Number,
                required: true
            },
            numReviews: {
                type: Number,
                required: true
            },
            meter: {
                type: Number,
                required: true
            }
        },
        lastUpdated: {
            type: Date,
            required: true
        }
    },
    poster: {
        type: String,
        required: false
    }

}, { collection: 'movies' })

module.exports = mongoose.model("movie", movieSchema);