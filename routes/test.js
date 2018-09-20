const mongoose = require('mongoose');

const usersModel = require('../models/users');

const url = 'mongodb://localhost:27017/quizSystem';
mongoose.connect(url, {
    useNewUrlParser: true
}, () => {
    console.log("Database connection established successfully");
});

usersModel.create({
    username: 'praveen',
    password: 'qwerty'
});