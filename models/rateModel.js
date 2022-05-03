const mongoose = require("mongoose");

const rateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, { collection: 'rates' });

module.exports = mongoose.model("rate", rateSchema);