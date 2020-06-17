const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 100,
        required: true,
    },
    ISBN: {
        type: String,
        minlength: 10,
        maxlength: 13
    },
    author: {
        type: String,
        maxlength: 50,
        required: true
    },
    publication: {
        type: String,
        maxlength: 50,
        required: true
    },
    image: {
        type: String
    },
    condition: {
        type: String,
        enum: ['New', 'Good', 'Not bad', 'Bad']
    },
    deliveryArea: {
        type: String,
        enum: ['Near my area', 'Within city', 'All over Nepal']
    },
    homeDeliver: {
        type: Boolean
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

exports = mongoose.model('Book', bookSchema);