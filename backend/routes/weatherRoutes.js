const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
    const { location } = req.query;
    if (!location) return res.status(400).json({ error: "Location required" });

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.WEATHER_API_KEY}`;
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch weather alerts" });
    }
});

module.exports = router;
