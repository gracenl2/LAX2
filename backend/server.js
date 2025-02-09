const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

// ADD MongoDB connection string HERE //
const url = '';
const client = new MongoClient(url);

// Function to generate random sea level data
function generateRandomSeaLevelData() {
    const cities = ['Tokyo', 'NewYork', 'Bangkok', 'Ottawa', 'Montreal'];
    const data = [];

    for (let year = 2000; year <= new Date().getFullYear(); year++) {
        for (let month = 0; month < 12; month++) {
            cities.forEach(city => {
                data.push({
                    city: city,
                    time: new Date(year, month, 1),
                    seaLevel: (Math.random() * (2.0 - 1.2) + 1.2).toFixed(2)
                });
            });
        }
    }

    return data;
}

// Function to insert data into MongoDB
async function insertData() {
    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas");

        const database = client.db('seaLevelDataDB');
        const collection = database.collection('seaLevels');

        const seaLevelData = generateRandomSeaLevelData();

        // Insert the data into MongoDB
        await collection.insertMany(seaLevelData);
        console.log(`Inserted ${seaLevelData.length} documents`);
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

app.get('/api/sea-levels', async (req, res) => {
    try {
        const { city, range } = req.query;
        const database = client.db('seaLevelDataDB');
        const collection = database.collection('seaLevels');

        const endDate = new Date();
        let startDate;
        switch (range) {
            case '3months':
                startDate = new Date(endDate.setMonth(endDate.getMonth() - 3));
                break;
            case '6months':
                startDate = new Date(endDate.setMonth(endDate.getMonth() - 6));
                break;
            case '1year':
                startDate = new Date(endDate.setFullYear(endDate.getFullYear() - 1));
                break;
            case '5years':
                startDate = new Date(endDate.setFullYear(endDate.getFullYear() - 5));
                break;
            case '10years':
                startDate = new Date(endDate.setFullYear(endDate.getFullYear() - 10));
                break;
            default:
                startDate = new Date(2000, 0, 1);
        }

        const seaLevels = await collection.find({
            city: city,
            time: { $gte: startDate, $lte: new Date() }
        }).toArray();

        res.json(seaLevels);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(port, async () => {
    console.log(`Server running at http://localhost:${port}`);
    await insertData();
});


//add this file in the backend root folder
// go to terminal and to the backend folder path
// and run the server using the command "node server.js" in terminal to execute the create the database and insert the data in the database