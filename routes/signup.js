const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');


//User route
router.put('/user/:user/pass/:pass', async (req, res) => {

    // Check if user already exists
    const usercheck_ = await User.findOne({ email: req.params.user });
    if (usercheck_ != null) {
        return res.send("user already exists!");
    }


    // String password validation
    if (!req.params.pass.match(/^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/)) {
        return res.send("Password must have at least 8 letters, one uppercase, one lowercase letter, and one special character");
    }

    // Hash password
    const saltrounds = 12;
    const password = await bcrypt.hash(req.params.pass, saltrounds);

    // Create a new user
    const user_ = new User({ email: req.params.user, password: password });

    // Validate Schema (email)
    const error = user_.validateSync();
    if (error != null) {
        console.log(error);
        if (res.error['email']) {
            return res.send(error.errors['email'].message);
        } else if (res.error['password']) {
            return res.send(error.errors['password'].message);
        } else {
            return res.sendStatus(500);
        }
    }

    //Save the user
    user_.save((err) => {
        //Handle error
        if (err) {
            console.error(err);
        }
    });

    //Return the user
    res.json(user_);
})

module.exports = router;