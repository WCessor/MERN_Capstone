const { MongoClient } = require('mongodb');

const books = [
    { id: '1', title: 'Reactions in REACT', author: 'Ben Dover', publisher: 'Random House', isbn: '978-3-16-148410-0', avail: true, who: '', due: '' },
    { id: '2', title: 'Express-sions', author: 'Frieda Livery', publisher: 'Chaotic House', isbn: '978-3-16-148410-2', avail: true, who: '', due: '' },
    { id: '3', title: 'Restful REST', author: 'Al Gorithm', publisher: 'ACM', isbn: '978-3-16-143310-1', avail: true, who: '', due: '' },
    { id: '4', title: 'See Essess', author: 'Anna Log', publisher: "O'Reilly", isbn: '987-6-54-148220-1', avail: false, who: 'Homer', due: '1/1/23' },
    { id: '5', title: 'Scripting in JS', author: 'Dee Gital', publisher: 'IEEE', isbn: '987-6-54-321123-1', avail: false, who: 'Marge', due: '1/2/23' },
    { id: '6', title: 'Be An HTML Hero', author: 'Jen Neric', publisher: 'Coders-R-Us', isbn: '987-6-54-321123-2', avail: false, who: 'Lisa', due: '1/3/23' },
    { id: '7', title: 'Introduction to MongoDB', author: 'Mongo DB', publisher: 'Mongo University', isbn: '978-3-16-148410-5', avail: true, who: '', due: '' },
    { id: '8', title: 'Data Modeling with MongoDB', author: 'Mongo Guru', publisher: 'Tech Press', isbn: '978-3-16-148410-6', avail: true, who: '', due: '' },
    { id: '9', title: 'Advanced Querying in MongoDB', author: 'Mongo Ninja', publisher: 'Ninja House', isbn: '978-3-16-148410-7', avail: true, who: '', due: '' },
    { id: '10', title: 'MongoDB Administration Guide', author: 'Mongo Admin', publisher: 'Admin Publishers', isbn: '978-3-16-148410-8', avail: true, who: '', due: '' }
];


async function initializeDatabase() {
    try {
        // Connection URI for MongoDB Atlas
        const uri = 'mongodb+srv://William:Junebug12!1234rewq@cluster0.njnnt05.mongodb.net/library';

        // Create a new MongoClient
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        // Connect to the MongoDB cluster
        await client.connect();

        // Access the database and collection
        const db = client.db();
        const collection = db.collection('books');

        // Delete all documents from the collection
        await collection.deleteMany({});

        // Insert the books into the collection
        const result = await collection.insertMany(books);
        console.log(`${result.insertedCount} books inserted successfully`);

        // Close the connection
        await client.close();
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

// Call the initializeDatabase function to initialize the database
initializeDatabase();
