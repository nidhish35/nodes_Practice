const users = require('./MOCK_DATA.json'); // Importing the JSON file containing user data
const express = require('express');
const app = express();
const port = 8000;

// Routes / if api/users is requested, return the json file if not api/users, return a html file
app.get('/api/users', (req, res) => {             
    res.json(users);
});

app.get('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === id);
    
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
})


app.post('/api/users', (req, res) => {
    return res.json({status : 'Pending'})
})

app.patch('/api/users/:id', (req, res) => {
    return res.json({status : 'Pending'})
})

app.delete('/api/users/:id', (req, res) => {
    return res.json({status : 'Pending'})
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
