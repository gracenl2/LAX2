// models/WaterLevel.js
// Mongoose model for the water_levels collection.
// Each water level document stores the level, a reference to the city,
// the time the measurement was taken, and a creation timestamp.

const mongoose = require('mongoose');

const WaterLevelSchema = new mongoose.Schema({
    city_id: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
    level: { type: Number, required: true },
    measured_at: { type: Date, required: true },
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('WaterLevel', WaterLevelSchema);
