const express = require('express');
const Profile = require('../models/Profile.js');
const router = express.Router();
const auth = require('./authentication')
const path = require('path');

//Done Testing Jul 6th

router.route('/')
.get(auth.verifyUser, (req, res, next) => {
	Profile.findById(req.user.profile)
	.then(profiles => res.status(200).json(profiles));
})
.post((req, res, next) => {
	const profile = {
		firstName, lastName, streetAddress, cityName, district,
	    profiePhoto, phoneNo,
		hidePhone, 
	} = req.body;

	Profile.create(profile)
	.then(profile => res.status(201).json(profile))
	.catch(next);
})
.put(auth.verifyUser, (req, res, next) => {
	const profile = {
		firstName, lastName, streetAddress,
		cityName, district, phoneNo,
		hidePhone, 
		profilePhoto
		} = req.body;	

	Profile.findByIdAndUpdate(req.user.profile, {$set: profile}, {new: true})
	.then(updatedProfile => {
		res.status(200).send(updatedProfile);
	}).catch(next);
});




module.exports = router;
