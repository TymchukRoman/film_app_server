const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    movie_id: {
        type: mongoose.ObjectId,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
}, { collection: 'comments' });

module.exports = mongoose.model("comment", commentSchema);