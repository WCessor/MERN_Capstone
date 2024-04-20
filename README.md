# MERN Capstone Project

This is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for tracking library books. Users can manage book inventory, check book availability, and track borrowing status.

## Backend

### `initializeDB.js`

This file initializes the MongoDB database with sample book data upon server startup. It connects to the MongoDB Atlas cluster and inserts predefined books into the `books` collection. 

Before starting the server, you can directly edit the array of books in the `initializeDB.js` file to customize the initial database content according to your preferences. 

To initialize the database:
1. Navigate to the `backend` directory.
2. Run the following command:

`node initializeDB.js`

### `server.js`

This file contains the backend server logic using Express.js. It sets up routes to handle CRUD operations for managing books in the library. The server connects to the MongoDB Atlas cluster and provides endpoints for fetching, adding, updating, and deleting books.

## Frontend

### `App.js`

This is the main component of the React.js frontend. It fetches book data from the backend server and displays it in a user-friendly interface. Users can view all books, filter books by availability, and perform actions such as checking out or checking in books.


