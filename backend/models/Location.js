const mongoose = require('mongoose');

// Schema for storing location-based sea level data
const LocationSchema = new mongoose.Schema({
    name: String,
    latitude: Number,
    longitude: Number,
    seaLevel: Number,
    riskLevel: String,
});

// Create a MongoDB model based on the schema
module.exports = mongoose.model('Location', LocationSchema);