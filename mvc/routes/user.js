const express = require('express').Router();

const router = express.Router();


// router.get('/users', async(req,res) => {
//     const allUsers = await User.find({});
//     const html = `
//     <ul>
//         ${allUsers.map(user => `<li>${user.firstname} ${user.lastname} </li>`).join('')}
//     </ul>
//     `;
//     res.send(html);
// });

router.get('/', async (req, res) => {
    const users = await User.find({});
    return res.json(users);
});


router.post('/', async (req, res) => {
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

router.route('/:id')
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

    module.exports = router;