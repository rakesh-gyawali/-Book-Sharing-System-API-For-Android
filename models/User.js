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
    address: {
        streetAddress: {
            type: String,
            required: true
        },
        cityName: {
            type: String,
            required: true
        },
        areaLocation: {    //Value need to ne inserted before creation of User.
            type: mongoose.Schema.Types.ObjectId,
            ref: 'District'
        }
    },
    contact: { 
        mobileNo: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phoneNo: {
            type: String,
            required: true
        },
        hidePhone: {
            type: Boolean,
            required: true
        }
    },
    profilePhoto: {
        type: String,
    },
    role: {
        type: String,
        default: 'normal',
        enum: ['normal', 'admin']
    },
    numberOfAdsPosted: {
        type: Number,
        min: 0,
        default: 0
    }, 
    postedBooks: [{  //One to Many relation: embedding ref into array of one side.
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
