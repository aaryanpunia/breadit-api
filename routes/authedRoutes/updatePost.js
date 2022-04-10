const User = require('../../models/User');
const express = require('express');
const Post = require('../../models/Post');
const router = express.Router();

router.put('/post/:id/content/:content', async (req, res) => {

    //Find Creator
    const user_ = await User.findOne({ email: res.locals.user['user'] });

    // Find post by ID
    const post_ = await Post.findOne({ _id: req.params.id });

    if (post_ != null && user_ != null && post_.author_id.equals(user_._id)) {
        Post.updateOne({ _id: post_._id }, { content: req.params.content }, function (err, data) {
            if (err) {
                console.log(err);
                return res.send(404);
            }
            res.send(`Successfully updated post ${post_.title}`);
        });
    } else {
        // console.log(user_);
        // console.log(post_);
        res.sendStatus(403);
    }
})

module.exports = router;