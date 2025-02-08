const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
    const { location } = req.query;
    if (!location) return res.status(400).json({ error: "Location required" });

    try {
        const response = await axios.get(`https://api.sealevels.org/current?location=${location}&key=${process.env.NOAA_API_KEY}`);
        res.json({
            location,
            seaLevel: response.data.sea_level,
            riskLevel: response.data.sea_level > 2 ? "High" : "Normal"
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch sea level data" });
    }
});

module.exports = router;
