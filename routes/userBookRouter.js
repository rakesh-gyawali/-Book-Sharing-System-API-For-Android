const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const auth = require('./authentication');

router.route('/')
.get(auth.verifyUser, (req, res, next) => {
	console.log("userid" + req.user.id);
	Book.find({owner: req.user.id})
	.then(books => {
		res.status(200).json(books);
	}).catch(next);
});

module.exports = router;
