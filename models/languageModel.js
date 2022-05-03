const mongoose = require("mongoose");

const languageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, { collection: 'languages' });

module.exports = mongoose.model("language", languageSchema);