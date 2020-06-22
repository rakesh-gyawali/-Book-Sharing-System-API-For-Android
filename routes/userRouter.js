const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('All  Users Will be Displayed Here');
});

router.post('/register', (req, res, next) => {
    let {
        username,
        password,
        firstName,
        lastName,
        address,
        contact,
        profilePhoto,
        role
    } = req.body;
    User.findOne({username})
    .then(user => {
        if (user) {
            let err = new Error('User already exists!');
            err.status = 401;
            return next(err);
        }
        bcrypt.hash(password, 10, (err, hash) => {

            if (err) next(err);
            User.create({username, password: hash, firstName, lastName, address, contact, profilePhoto, role})
            .then(user => {
                res.json('Status: Registration Successful!  ');
            }).catch(err);
        }); 
    })
});


router.post('/login', (req, res, next) => {
    res.send("Login will be performed later!!!");
})

module.exports = router;
