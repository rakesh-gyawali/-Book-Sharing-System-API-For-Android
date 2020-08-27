const mongoose = require('mongoose');
const User = require('./User');


const bookSchema = new mongoose.Schema({
	title: {
			type: String,
			maxlength: 100,
			required: true,
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
        type: String,
        required: true
    },
	
    deliveryArea: {
        type: String,
		enum: ['Near my area', 'Within city', 'All over Nepal'],
		required: true
    },

	cost: {
		type: Number
	},

	category: {
		type: String,
		required: true
	},
	condition: {
		type: String,
		required: true
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
	}
},
{timestamps: true});

module.exports = mongoose.model('Book', bookSchema); 