// app.js
// Main entry point for the sea level backend service.
// This file configures the Express server, connects to MongoDB,
// sets up middleware, initializes Socket.io for live updates, and mounts our API routes.

require('dotenv').config(); // Loads environment variables from .env

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const seaLevelRoutes = require('./routes/seaLevelRoutes');

const app = express();
const server = http.createServer(app);

// Initialize Socket.io for real-time subscriptions.
// (In production, adjust CORS settings as needed.)
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Connect to MongoDB using the connection string from .env
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Middleware to parse JSON bodies from incoming requests
app.use(express.json());

// Attach the Socket.io instance to every request so that route handlers can emit events.
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Mount the sea level API endpoints under /api/sea-level
app.use('/api/sea-level', seaLevelRoutes);

// Start the server on the port specified in .env (or default to 3000)
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
