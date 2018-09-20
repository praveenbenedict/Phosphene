const mongoose = require('mongoose');

const schema = mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answers: {
        type: [String],
        required: true,
        validate: {
            validator: (arr) => arr.length>0,
            message: 'Atleast one answer is required'
        }
    }
});

const model = mongoose.model('textQuestion',schema);

module.exports = model;