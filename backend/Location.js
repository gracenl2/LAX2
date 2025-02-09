const axios = require('axios');

async function fetchSeaLevelData(latitude, longitude) {
    try {
        const url = `https://api.stormglass.io/v2/weather/point`;
        const params = { lat: latitude, lng: longitude, params: 'seaLevel' };
        const headers = { 'Authorization': process.env.STORMGLASS_API_KEY };

        const response = await axios.get(url, { params, headers });

        console.log("Full Stormglass API Response:", JSON.stringify(response.data, null, 2));

        if (response.data && response.data.hours && response.data.hours.length > 0) {
            return response.data.hours[0].seaLevel;
        }

        console.warn("Stormglass returned no sea level data.");
        return null;
    } catch (error) {
        console.error("Error fetching sea level data from Stormglass:", error.response ? error.response.data : error.message);
        return null;
    }
}

// ✅ Ensure the function is properly exported
module.exports = { fetchSeaLevelData };
