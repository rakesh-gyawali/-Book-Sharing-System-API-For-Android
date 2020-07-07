const mongoose = require('mongoose');
const Profile = require('./Profile');

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
	email: {
		type: String,
		required: true
	},
	role: {
        type: String,
        default: 'normal',
        enum: ['normal', 'admin']
	},
	profile: {
		type: mongoose.Schema.Types.ObjectId,
		ref: Profile,
		required: true
	}
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);