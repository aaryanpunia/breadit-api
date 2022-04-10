const express = require('express');
const router = express.Router();
const Loaf = require('../../models/Loaf');
const User = require('../../models/User');
const mongoose = require('mongoose');


router.put('/title/:title', async (req, res) => {
    //Find Creator
    const user_ = await User.findOne({ email: res.locals.user['user'] });

    // Check if Loaf exists
    const loaf_check = await Loaf.findOne({ title: req.params.title });
    if (loaf_check != null) {
        return res.status(403).send("Loaf already exists")
    }

    // Create Loaf
    const loaf_ = new Loaf({ title: req.params.title, members: [user_] })

    //Validate LoafSchema
    const error = loaf_.validateSync();
    if (error != null) {
        return res.send(error.errors['title'].message);
    }

    //Save the loaf
    loaf_.save((err) => {
        //Handle error
        if (err) {
            console.error(err);
        }
    });

    //Save Loaf id to User
    user_['loafs'].push(mongoose.Types.ObjectId(loaf_._id));

    //Save the User
    user_.save((err) => {
        //Handle error
        if (err) {
            console.error(err);
        }
    });

    res.send(loaf_);
});

module.exports = router;