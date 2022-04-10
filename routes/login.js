const express = require('express');
const router = express.Router()
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// configure dotenv
dotenv.config();

router.put('/user/:user/pass/:pass', async (req, res) => {

    // Find User by Email
    const user = await User.findOne({ email: req.params.user })

    //Check if User exists
    if (user == null) {
        return res.send("User not found!")
    }

    //Get password
    const password = user.password;

    //Compare Password
    const correct = await bcrypt.compare(req.params.pass, password);

    //Return comparison result
    if (correct) {
        const token = jwt.sign({ user: req.params.user }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
        res.json({ "token": token });
    } else {
        res.send("Invalid password");
    }
})


module.exports = router;