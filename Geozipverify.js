const express = require('express');
const bodyparser = require("body-parser");
const cors = require('cors');
const { MongoClient } = require('mongodb');
//import dotenv from 'dotenv';
require("dotenv").config();
//dotenv.config();
const app = express();
const port = 3000;
app.use(cors());

app.use(bodyparser.json());

//const uri = 'mongodb+srv://dhimanshubham164:Echo%406sieralimadelta@cluster0.cqbbcxc.mongodb.net/Zipcodes';
const uri = process.env.mongo_db_url;
console.log(uri);
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

app.use(async (req, res, next) => {
    req.db = await connectToDatabase();
    next();
});
app.get('/api/items', async (req, res) => {
    try {

        const collection = req.db.collection("Poland");
        const items = await collection.find({}).toArray();
        res.json(items);
    }
    catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

})
app.get('/api/search', async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.status(400).json({ error: 'Search query parameter "q" is required' });
        }


        const collection = req.db.collection("Poland");

        const items = await collection.findOne({ postal_code: query });
        //const items = await collection.find({ postal_code: { $regex: '34', $options: 'i' } }).toArray();


        console.log('Query:', query);
        console.log('Items:', items);

        res.json(items);
    } catch (error) {
        console.error("Error in search:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.listen(port, (error) => {
    if (error) {
        console.error('Error starting the server:', error);
    } else {
        console.log(`Server is listening on port ${port}`);
    }
});
