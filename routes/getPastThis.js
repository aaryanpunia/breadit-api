const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


// Auth JWT Function
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403)
        };

        res.locals.user = user;
        next();
    });
}

//Import secure routes
const makeLoaf = require('./authedRoutes/makeLoaf');
const postToLoaf = require('./authedRoutes/postToLoaf');
const deletePost = require('./authedRoutes/deletePost');
const updatePost = require('./authedRoutes/updatePost');
const GiveBreadToPost = require('./authedRoutes/GiveBreadToPost');
const CommentOnPost = require('./authedRoutes/CommentOnPost');

// Auth middleware
router.use(authenticateToken);

//Secure routes
router.use('/makeloaf', makeLoaf);
router.use('/postloaf', postToLoaf);
router.use('/deletepost', deletePost);
router.use('/updatepost', updatePost);
router.use('/givepostbread', GiveBreadToPost);
router.use('/commentpost', CommentOnPost);


module.exports = router;