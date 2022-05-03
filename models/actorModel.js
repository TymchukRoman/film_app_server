const mongoose = require("mongoose");

const actorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, { collection: 'actors' });

module.exports = mongoose.model("actor", actorSchema);