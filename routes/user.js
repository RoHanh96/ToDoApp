const express = require('express');
const User = require('../models/User');

const router = express.Router;

router.post('/users', async (req, res) => {
    //Create a new user
    try {
        const user = new User (req.body);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (err) {
        res.status(400).send(err);
    }
})