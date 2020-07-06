const express = require('express');
const Profile = require('../models/Profile.js');
const router = express.Router();
//Done Testing Jul 6th

router.route('/')
.get((req, res, next) => {
	Profile.find()
	.then(profiles => res.status(200).json(profiles));
})
.post((req, res, next) => {
	const profile = {
		firstName, lastName, address,
		contact, profiePhoto
	} = req.body;

	Profile.create(profile)
	.then(profile => res.status(201).json(profile))
	.catch(next);
})
.delete((req, res, next) => {
	Profile.deleteMany()
	.then(reply => res.status(200).json(reply));
});



module.exports = router;
