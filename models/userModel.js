const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    settings: {
        theme: {
            type: String,
            required: true,
            default: 'light'
        },
    },
    registerDatetime: {
        type: String,
        required: true
    },
    favorites: {
        type: Array,
        required: true,
        default: []
    }
}, { collection: 'users' });

module.exports = mongoose.model("user", userSchema);