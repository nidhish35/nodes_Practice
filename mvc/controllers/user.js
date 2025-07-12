const users = require('../models/user');

async function handleGetAllUsers(req, res) {
    try {
        const usersList = await users.find({});
        return res.json(usersList);
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

}

async function getUserById(req, res) {
    const user = await users.findById(req.params.id);

    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
}

async function updateUserById(req, res) {
    await users.findByIdAndUpdate(req.params.id, { lastname: "changed" });
    return res.json({ status: 'success' })
}

async function deleteUserById(req, res) {
    await users.findByIdAndDelete(req.params.id);
    return res.json({ status: 'success' });
}

async function handleCreateUser(req, res) {
    const body = req.body;
    const result = await users.create({
        firstname: body.first_name,
        lastname: body.last_name,
        email: body.email,
        gender: body.gender,
        jobtitle: body.job_title
    })
    console.log(result);
    return res.status(201).json({ status: 'Success', id: result._id });
}

module.exports = {
    handleGetAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    handleCreateUser
};