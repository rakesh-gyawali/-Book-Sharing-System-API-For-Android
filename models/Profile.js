
const mongoose = require('mongoose');
const profileSchema = new mongoose.Schema({
	firstName: {
        type: String,
        required: true
    },
    lastName: {
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
	district: {
		type: String,
		required: true
	},
	phoneNo: {
		type: String,
	},
	hidePhone: {
		type: Boolean,
		required: true
	},
	profilePhoto: {
		type: String,
	},
	numberOfActiveAds: {
        type: Number,
        min: 0,
        default: 0
	},
});

module.exports = mongoose.model('Profile', profileSchema);