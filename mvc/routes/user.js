const express = require('express');

const router = express.Router();

const { handleGetAllUsers, updateUserById, getUserById, deleteUserById, handleCreateUser } = require('../controllers/user'); // Importing the controller function

// router.get('/users', async(req,res) => {
//     const allUsers = await User.find({});
//     const html = `
//     <ul>
//         ${allUsers.map(user => `<li>${user.firstname} ${user.lastname} </li>`).join('')}
//     </ul>
//     `;
//     res.send(html);
// });

router.get('/', handleGetAllUsers); // Route to get all users

router.post('/', handleCreateUser); // Route to create a new user

router.route('/:id') // Route to handle operations on a specific user by ID
    .get(getUserById) // Get user by ID
    .patch(updateUserById) // Update user by ID
    .delete(deleteUserById); // Delete user by ID

    module.exports = router; // Exporting the router to be used in the main app