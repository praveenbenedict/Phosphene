const mongoose = require('mongoose');
const schema = mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true,
        validate: {
            validator: (arr) => arr.length>1,
            mesaage: 'Atleast 2 options need to be added'
        }
    },
    answer: {
        type: String,
        required: true
    }
});

var model = mongoose.model('mcq',schema);

module.exports = model;