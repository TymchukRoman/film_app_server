const mongoose = require("mongoose");

const countrieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, { collection: 'countries' });

module.exports = mongoose.model("countrie", countrieSchema);