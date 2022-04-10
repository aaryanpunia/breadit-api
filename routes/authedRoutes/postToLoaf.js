const express = require('express');
const router = express.Router();
const Loaf = require('../../models/Loaf');
const User = require('../../models/User');
const Post = require('../../models/Post');
const mongoose = require('mongoose');

router.put('/loaf/:loaf/title/:title/content/:content', async (req, res) => {

    //Find Creator
    const user_ = await User.findOne({ email: res.locals.user['user'] });

    //Find loaf
    const loaf_ = await Loaf.findOne({ title: req.params.loaf });
    if (loaf_ == null) {
        res.send(404);
    }

    // Create Post
    const post_ = new Post({
        author_id: mongoose.Types.ObjectId(user_._id),
        author_name: user_.email,
        title: req.params.title,
        content: req.params.content,
    });

    //Save the Post
    post_.save((err) => {
        //Handle error
        if (err) {
            console.error(err);
        }
    });

    // Reference Post in Loaf
    loaf_['posts'].push(mongoose.Types.ObjectId(post_._id));

    //Save the loaf
    loaf_.save((err) => {
        //Handle error
        if (err) {
            console.error(err);
        }
    });

    //Reference Post in User
    user_['posts'].push(mongoose.Types.ObjectId(post_._id));

    //Save the User
    user_.save((err) => {
        //Handle error
        if (err) {
            console.error(err);
        }
    });

    res.send(post_);
})

module.exports = router;