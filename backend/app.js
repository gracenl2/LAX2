// Import core dependencies
const express = require('express'); // Backend framework for handling requests
const cors = require('cors'); // Allows the frontend to communicate with the backend from different origins
require('dotenv').config(); // Loads environment variables (e.g., API keys, port) from a .env file

const app = express();

// Middleware setup
// - CORS allows frontend requests from different domains (important if frontend is hosted separately).
// - JSON middleware allows API to handle JSON payloads in requests.
app.use(cors());
app.use(express.json());

// Import route modules to organize API logic
// - Each module handles a specific feature (sea level data, maps, weather).
const seaLevelRoutes = require('./routes/seaLevelRoutes');
const mapRoutes = require('./routes/mapRoutes');
const weatherRoutes = require('./routes/weatherRoutes');

// Define API endpoints for different features
// - These routes structure the API to be modular and scalable.
app.use('/api/sealevel', seaLevelRoutes); // Manages sea level-related API requests
app.use('/api/route', mapRoutes); // Handles route planning and Google Maps integration
app.use('/api/weather', weatherRoutes); // Provides weather data for relevant locations

// Set the server port (uses environment variable if available, defaults to 5000)
// - This ensures flexibility when deploying the API on different platforms.
const PORT = process.env.PORT || 5000;

// Basic health check route to confirm the API is running
// - Useful for debugging and deployment checks.
app.get('/', (req, res) => {
    res.send("✅ API is running");
});

// Start the server and listen for incoming requests
// - This makes the backend available to handle API calls from the frontend.
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
