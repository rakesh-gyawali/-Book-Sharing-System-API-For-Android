const mongoose = require('mongoose');

const reviewSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{ timestamps: true });

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 5
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    streetAddress: {
        type: String,
        required: true
    },
    cityName: {
        type: String,
        required: true
    },
    areaLocation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'District'
    },
    hidePhone: {
        type: Boolean,
        required: true,
        default: false
    },
    overallRating: {
        type: Number,
        min:0,
        max:5,
        default: 0
    },
    profilePhoto: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'basic',
        enum: ['basic', 'manager', 'admin']
    },
    numberOfAdsPosted: {
        type: Number,
        min: 0,
        default: 0
    },
    reviews: [ reviewSchema ]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
