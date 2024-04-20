const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI; 
console.log(MONGODB_URI)

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if (req.method === "OPTIONS") res.sendStatus(200);
    else next();
});

app.use(express.json());

let db;

async function connectToDatabase() {
    try {
        // Connection URI for MongoDB Atlas
        const uri = MONGODB_URI;

        // Create a new MongoClient
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        // Connect to the MongoDB cluster
        await client.connect();

        console.log('Connected to MongoDB Atlas');
        
        // Access the database
        db = client.db(); // This will connect to the 'library' database

    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
    }
}


connectToDatabase();

app.get('/books', async (req, res) => {
    try {
        const books = await db.collection('books').find().toArray();
        res.json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/books/:id', async (req, res) => {
    try {
        const book = await db.collection('books').findOne({ id: req.params.id });
        if (!book) return res.status(404).json({ error: 'Book not found' });
        res.json(book);
    } catch (error) {
        console.error('Error fetching book by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/books/avail/:avail', async (req, res) => {
    try {
        const avail = req.params.avail === 'true';
        const filteredBooks = await db.collection('books').find({ avail }).toArray();
        res.json(filteredBooks);
    } catch (error) {
        console.error('Error fetching books by availability:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/books', async (req, res) => {
    try {
        const newBook = req.body;
        const existingBook = await db.collection('books').findOne({ id: newBook.id });
        if (existingBook) return res.status(403).json({ error: 'Book already exists' });
        await db.collection('books').insertOne(newBook);
        res.status(201).json(newBook);
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/books/:id', async (req, res) => {
    try {
        const filter = { id: req.params.id };
        const update = { $set: req.body };
        const result = await db.collection('books').updateOne(filter, update);
        if (result.modifiedCount === 0) return res.status(404).json({ error: 'Book not found' });
        res.json({ message: 'Book updated successfully' });
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/books/:id', async (req, res) => {
    try {
        const result = await db.collection('books').deleteOne({ id: req.params.id });
        if (result.deletedCount === 0) return res.status(404).json({ error: 'Book not found' });
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
