const mongoose = require('mongoose');

const schema = mongoose.Schema({
    mcqQuestions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'mcq'
    }],
    textQuestions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'textQuestion'
    }],
    author: {
        type: String,
        required: true,
        default: 'leander'
    },
    quizTitle: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

const model = mongoose.model('quiz',schema);

module.exports = model;