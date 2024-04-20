# MERN Capstone Project

This is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for tracking library books. Users can manage book inventory, check book availability, and track borrowing status.

## Setup

To use the application, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/WCessor/MERN_Capstone.git
```

2. Navigate to the project's main directory and install dependencies:

```bash
npm run setup
```

This may take a few minutes.

3. Create environment variable

In the main project directory, create a new file named:
```bash
.env
```
Inside the file put:
```bash
MONGODB_URI=<your mongo db connection string>
```
For example:
```bash
MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.njnnt05.mongodb.net/library"
```

4. Start the development servers:

```bash
yarn dev
```

This will open the browser, allowing you to interact with the application.

## Backend

### `initializeDB.js`

This file initializes the MongoDB database with sample book data upon server startup. It connects to the MongoDB Atlas cluster and inserts predefined books into the `books` collection. 

Before starting the server, you can directly edit the array of books in the `initializeDB.js` file to customize the initial database content according to your preferences. 

To initialize the database:

1. Navigate to the `backend` directory.
2. Run the following command:

```bash
node initializeDB.js
```

### `server.js`

This file contains the backend server logic using Express.js. It sets up routes to handle CRUD operations for managing books in the library. The server connects to the MongoDB Atlas cluster and provides endpoints for fetching, adding, updating, and deleting books.

## Frontend

### `App.js`

This is the main component of the React.js frontend. It fetches book data from the backend server and displays it in a user-friendly interface. Users can view all books, filter books by availability, and perform actions such as checking out or checking in books.