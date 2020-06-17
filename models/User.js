const mongoose = require('mongoose');

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
    }   
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
