const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//configure dotenv
dotenv.config();

// import routes
const welcome = require('./routes/welcome');
const signup = require('./routes/signup');
const login = require('./routes/login');
const getPast = require('./routes/getPastThis');

// Configure Port
const port = 3000
app.listen(port, (err) => {
    if (err) console.error(err);
    else {
        console.log(`Server started at Port: ${port}`)
    }
});


//Connect to database
try {
    mongoose.connect(process.env.MONGODB_ACCESS, () => {
        console.log('Connected to Mongo');
    });
} catch (err) {
    console.error(err);
}

// use routes
app.use('/', welcome);
app.use('/signup', signup);
app.use('/login', login);
app.use('/secure', getPast);