// routes/seaLevelRoutes.js
// Defines API endpoints for retrieving water level history,
// inserting new water level measurements, and calculating statistics.

const express = require('express');
const router = express.Router();
const City = require('../models/City');
const WaterLevel = require('../models/WaterLevel');
const { fetchSeaLevelData } = require('../Location');

// GET historical water level data for a specific city
router.get('/cities/:cityId/water-levels', async (req, res) => {
    try {
        const { cityId } = req.params;
        // Retrieve all water level measurements for the given city, sorted by measurement time
        const waterLevels = await WaterLevel.find({ city_id: cityId }).sort({ measured_at: 1 });
        res.json(waterLevels);
    } catch (error) {
        console.error('Error fetching water levels:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST a new water level measurement for a city
router.post('/cities/:cityId/water-levels', async (req, res) => {
    try {
        const { cityId } = req.params;
        // Verify that the city exists in the database
        const city = await City.findById(cityId);
        if (!city) {
            return res.status(404).json({ error: 'City not found' });
        }

        // Optionally, use the Stormglass API to fetch sea level data if latitude and longitude are provided.
        // (This helps if the frontend does not send a water level value.)
        const { latitude, longitude, measured_at } = req.body;
        let seaLevelFromAPI = null;
        if (latitude && longitude) {
            seaLevelFromAPI = await fetchSeaLevelData(latitude, longitude);
        }

        // Use the provided level if available; otherwise, use the value from Stormglass.
        const level = req.body.level || seaLevelFromAPI;
        if (level === undefined || level === null) {
            return res.status(400).json({ error: 'Water level data is required' });
        }

        // Create a new water level measurement document
        const newMeasurement = new WaterLevel({
            city_id: cityId,
            level,
            measured_at: measured_at || new Date(),
        });
        await newMeasurement.save();

        // Emit a real-time event to all connected clients with the new measurement
        req.io.emit('newMeasurement', newMeasurement);

        res.status(201).json(newMeasurement);
    } catch (error) {
        console.error('Error adding water level measurement:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET statistics (high, low, average) for a specific city's water levels
router.get('/cities/:cityId/statistics', async (req, res) => {
    try {
        const { cityId } = req.params;
        // Retrieve all measurements for the city
        const measurements = await WaterLevel.find({ city_id: cityId });

        if (measurements.length === 0) {
            return res.status(404).json({ error: 'No measurements found for this city' });
        }

        // Calculate the high, low, and average water levels
        let high = -Infinity;
        let low = Infinity;
        let sum = 0;
        measurements.forEach(m => {
            high = Math.max(high, m.level);
            low = Math.min(low, m.level);
            sum += m.level;
        });
        const average = sum / measurements.length;

        res.json({ high, low, average });
    } catch (error) {
        console.error('Error calculating statistics:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET all cities
router.get('/cities', async (req, res) => {
    try {
        const cities = await City.find(); // Fetch all cities from MongoDB
        res.json(cities);
    } catch (error) {
        console.error('Error fetching cities:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;



// TEST ROUTE: Calls Stormglass API directly and prints the result
router.get('/test-stormglass', async (req, res) => {
    try {
        const latitude = 45.5017; // Example: Montreal
        const longitude = -73.5673;

        const seaLevel = await fetchSeaLevelData(latitude, longitude);
        res.json({ seaLevel });
    } catch (error) {
        console.error("Error calling Stormglass:", error);
        res.status(500).json({ error: "Failed to fetch sea level data" });
    }
});

