const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
    const { lat, lng } = req.query;
    if (!lat || !lng) return res.status(400).json({ error: "Latitude and longitude are required" });

    try {
        const url = `https://api.stormglass.io/v2/tide/extremes/point?lat=${lat}&lng=${lng}&start=now&end=now`;
        const headers = { headers: { 'Authorization': process.env.STORMGLASS_API_KEY } };
        const response = await axios.get(url, headers);

        res.json({
            location: { latitude: lat, longitude: lng },
            tides: response.data.extremes
        });

    } catch (error) {
        res.status(500).json({ error: "❌ Failed to fetch sea level data" });
    }
});

module.exports = router;
