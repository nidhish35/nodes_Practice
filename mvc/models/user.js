const mongoose = require('mongoose');


//schema for user data
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true  // First name is required       
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true  // Email must be unique
    },
    gender: {
        type: String,
    },
    jobtitle: {
        type: String,
    },
});

// model for user data
const User = mongoose.model('User', userSchema);    

module.exports = User;