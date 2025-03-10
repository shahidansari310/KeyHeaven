const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3000;
const url = 'mongodb://localhost:27017';
const dbName = 'KeyHeaven';

app.use(express.json());
app.use(cors());

const client = new MongoClient(url);
client.connect().then(() => console.log('Connected to MongoDB'));
const db = client.db(dbName);
const collection = db.collection('documents');

// GET all documents
app.get('/', async (req, res) => {
    console.log('Received data:', req.body);
    const data = await collection.find({}).toArray();
    res.json(data);
});

// POST: Add a document
app.post('/', async (req, res) => {
    const result = await collection.insertOne(req.body);
    res.json({ message: 'Added successfully', id: result.insertedId });
});

// DELETE: Remove a document
app.delete('/', async (req, res) => {
    const { site } = req.body;
    const result = await collection.deleteOne({ site });
    res.json({ success: result.deletedCount > 0 });
});

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));
