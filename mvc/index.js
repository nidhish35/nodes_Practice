const express = require('express');
const { connectToMongoDB } = require('./connection'); // Importing the connection function
const {logRequest} = require('./middlewares'); // Importing the logRequest middleware
const app = express();
const port = 8000;

const userRouter = require('./routes/user'); // Importing the User model

app.use(express.urlencoded({ extended: false })); // Middleware to parse URL-encoded bodies
app.use(express.json()); // Middleware to parse JSON bodies

app.use(logRequest('log.txt')); // Using the logRequest middleware

app.use('/user', userRouter);

connectToMongoDB('mongodb://localhost:27017/mvc_app');

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});