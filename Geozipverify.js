const express = require('express');
const bodyparser = require("body-parser");
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

app.use(bodyparser.json());

const uri = 'mongodb+srv://dhimanshubham164:Echo%406sieralimadelta@cluster0.cqbbcxc.mongodb.net/Zipcodes';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db('Zipcodes');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}
app.get('/api/items', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("Poland");
        const items = await collection.find({}).toArray();
        res.json(items);
    }
    catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

})
app.listen(port, (error) => {
    if (error) {
        console.error('Error starting the server:', error);
    } else {
        console.log(`Server is listening on port ${port}`);
    }
});
