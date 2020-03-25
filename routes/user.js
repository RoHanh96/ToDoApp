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

//when use want to logout in only current browser, other browser or device that using logged in can't be logged out
router.post('/user/todo/logout', auth, async(req, res) => {
    try {
        //Only remoe token that equal to sent token
        req.user.tokens =  req.user.tokens.filter(function (token) {
            return token.token != req.token
        });
        await req.user.save();
        res.send("Log out success!");
    } catch (error) {
        res.status(500).send(error);
    }
});

//when use want to logout from all deveice that user is logging in
router.post('/user/todo/logoutall', auth, async(req, res) => {
    try {
        req.user.tokens.splice(0, req.user.tokens.length);
        await req.user.save();
        res.send("Log out success");
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;