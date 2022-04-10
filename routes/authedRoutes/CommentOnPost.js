const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');
const mongoose = require('mongoose');


router.put('/post/:id/content/:content', async (req, res) => {

    // Find post by ID
    const post_ = await Post.findOne({ _id: req.params.id });
    if (post_ == null) {
        return res.status(404);
    }

    //Find User
    const user_ = await User.findOne({ email: res.locals.user['user'] });

    // Take Bread from User
    let bread_ = user_.bread;
    if (bread_ <= 10) {
        return res.send(`You have ${bread_} bread, make some interesting posts before giving bread to others`);
    } else {
        bread_ -= 1;
        user_.bread = bread_;
    }

    // Create Comment
    const comment_ = new Comment({
        author_id: user_._id,
        author_name: user_.username,
        content: req.params.content,
    })

    // Save comment
    comment_.save((err) => {
        //Handle error
        if (err) {
            console.error(err);
        }
    });

    // Push Comment to post
    post_.comments.push(mongoose.Types.ObjectId(comment_._id));

    // Save Comment to post
    post_.save((err) => {
        //Handle error
        if (err) {
            console.error(err);
        }
    });

    res.send(post_);

});

module.exports = router;