const users = require('./MOCK_DATA.json'); // Importing the JSON file containing user data
const express = require('express');
const mongoose = require('mongoose'); // Importing mongoose for MongoDB interactions
const fs = require('fs'); // Importing the file system module
const app = express();
const port = 8000;


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/practice_app')
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });
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


// Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Middleware 
app.use(express.json()); // Middleware to parse JSON bodies
// Routes / if api/users is requested, return the json file if not api/users, return a html file

app.get('/users', async(req,res) => {
    const allUsers = await User.find({});
    const html = `
    <ul>
        ${allUsers.map(user => `<li>${user.firstname} ${user.lastname} </li>`).join('')}
    </ul>
    `;
    res.send(html);
});

app.get('/api/users', (req, res) => {
    res.json(users);
});


app.post('/api/users', async (req, res) => {
    const body = req.body;
    const result = await User.create({
        firstname: body.first_name,
        lastname: body.last_name,
        email: body.email,
        gender: body.gender,
        jobtitle: body.job_title
    })
    console.log(result);
    return res.status(201).json({ status: 'Success', id: result._id });
});

app.route('/api/users/:id')
    .get(async (req, res) => {
        const user = await User.findById(req.params.id);

        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    })
    .patch(async(req, res) => {
        await User.findByIdAndUpdate(req.params.id, {lastname: "changed"});
        return res.json({ status: 'success' })
    })
    .delete(async (req, res) => {
        await User.findByIdAndDelete(req.params.id);
        return res.json({ status: 'success' })
    });


// app.post('/api/users', (req, res) => {
//     const body = req.body;
//     const newUser = { id: users.length + 1, ...body };
// users.push(newUser);
//  // Add the new user to the users array
//     fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
//     return res.json({ status: 'Success', id:users.length });
//     });
// })

// app.patch('/api/users/:id', (req, res) => {
//     return res.json({ status: 'Pending' })
// })

// app.delete('/api/users/:id', (req, res) => {
//     return res.json({ status: 'Pending' })
// })

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
