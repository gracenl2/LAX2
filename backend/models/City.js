// models/City.js
// Mongoose model for the cities collection.
// Each city document stores a name, address, and creation timestamp.

const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('City', CitySchema);
