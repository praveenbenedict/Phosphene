const mongoose = require('mongoose');
const Quiz = require('./quizes');


const schema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    quizes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'quiz'
    }]
});

const model = mongoose.model('users',schema);

module.exports = model;