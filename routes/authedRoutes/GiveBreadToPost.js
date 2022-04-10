const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Post = require('../../models/Post');

router.put('/post/:id', async (req, res) => {

    //Get User
    const user_ = await User.findOne({ email: res.locals.user['user'] });

    // Find post by ID
    const post_ = await Post.findOne({ _id: req.params.id });

    // Take Bread from User
    let bread_ = user_.bread;
    if (bread_ <= 10) {
        return res.send(`You have ${bread_} bread, make some interesting posts before giving bread to others`);
    } else {
        bread_ -= 1;
        user_.bread = bread_;
    }

    //Save the User
    user_.save((err) => {
        //Handle error
        if (err) {
            console.error(err);
        }
    });

    //Give Bread to post
    let postBread_ = post_.bread;
    postBread_ += 1;
    post_.bread = postBread_;

    //Save the Post
    post_.save((err) => {
        //Handle error
        if (err) {
            console.error(err);
        }
    });

    res.send(post_)
})

module.exports = router;