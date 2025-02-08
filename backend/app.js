const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const seaLevelRoutes = require('./routes/seaLevelRoutes');
const mapRoutes = require('./routes/mapRoutes');
const weatherRoutes = require('./routes/weatherRoutes');

app.use('/api/sealevel', seaLevelRoutes);
app.use('/api/route', mapRoutes);
app.use('/api/weather', weatherRoutes);


const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("✅ API is running");
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
