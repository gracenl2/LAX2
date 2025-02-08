const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
    const { location } = req.query;
    if (!location) return res.status(400).json({ error: "Location is required" });

    try {
        const url = `https://api.tomorrow.io/v4/weather/realtime?location=${location}&apikey=${process.env.TOMORROW_API_KEY}`;
        const response = await axios.get(url);

        res.json({
            city: location,
            temperature: `${response.data.data.values.temperature} °C`,
            humidity: `${response.data.data.values.humidity}%`,
            wind_speed: `${response.data.data.values.windSpeed} m/s`,
            weather_code: response.data.data.values.weatherCode
        });

    } catch (error) {
        res.status(500).json({ error: "❌ Failed to fetch weather data" });
    }
});

module.exports = router;
