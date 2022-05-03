const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, { collection: 'genres' });

module.exports = mongoose.model("genre", genreSchema);