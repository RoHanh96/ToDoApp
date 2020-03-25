const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

//Create new user
router.post('/createUser', async (req, res) => {
    //Create a new user
    try {
        const user = new User (req.body);
        await user.save();
        //With each successfull register, create an token and save them to tokens field on databases
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (err) {
        res.status(400).send(err);
    }
});

//User login
router.post('/login',　async (req, res) => {
    //Login a registred user
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials!'});
        }
        //With each successfull login, create an token and save them to tokens field on databases
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

//User access user's resource
router.get('/user/me', auth, async(req, res) => {
    //View user profile
    res.send(req.user);
});

module.exports = router;