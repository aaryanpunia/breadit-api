const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const User = require('../../models/User');

router.put('/post/:id', async (req, res) => {

    // Find post by ID
    const post_ = await Post.findOne({ _id: req.params.id });

    //Get User
    const user_ = await User.findOne({ email: res.locals.user['user'] });

    // Check if User is author
    if (post_ != null && user_ != null && post_.author_id.equals(user_._id)) {
        // Delete post
        Post.deleteOne({ _id: req.params.id }, function (err) {
            if (err) {
                console.log(err);
                return res.status(404).send("Post not found, Could not delete");
            } else {
                return res.send(`Deleted post with title ${post_.title} successfully.`);
            }
        });
    } else {
        res.sendStatus(403);
    }

});

module.exports = router;
