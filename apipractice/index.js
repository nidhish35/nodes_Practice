const users = require('./MOCK_DATA.json'); // Importing the JSON file containing user data
const express = require('express');
const fs = require('fs'); // Importing the file system module
const app = express();
const port = 8000;

app.use(express.urlencoded({ extended: false })); // Middleware 
// Routes / if api/users is requested, return the json file if not api/users, return a html file
app.get('/api/users', (req, res) => {
    res.json(users);
});

app.route('/api/users/:id')
    .get((req, res) => {
        const id = parseInt(req.params.id, 10);
        const user = users.find(u => u.id === id);

        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    })
    .patch((req, res) => {
        return res.json({ status: 'Pending' })
    })
    .delete((req, res) => {
        return res.json({ status: 'Pending' })
    });


app.post('/api/users', (req, res) => {
    const body = req.body;
    const newUser = { id: users.length + 1, ...body };
users.push(newUser);
 // Add the new user to the users array
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
    return res.json({ status: 'Success', id:users.length });
    });
})

// app.patch('/api/users/:id', (req, res) => {
//     return res.json({ status: 'Pending' })
// })

// app.delete('/api/users/:id', (req, res) => {
//     return res.json({ status: 'Pending' })
// })

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
