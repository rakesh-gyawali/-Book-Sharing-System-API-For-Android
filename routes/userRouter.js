const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('All  Users Will be Displayed Here');
});

// Register:Test Done!!
// Login: Test Done !!(Jwt token in generated successfully!)
router.post('/register', (req, res, next) => {
    let {
        username,
        password,
		profile,
		email,
        role
	} = req.body;
	
	User.findOne({username})
	.then(user => {
        if (user) {
            let err = new Error('User already exists!');
            err.status = 401;
            return next(err);
        } else {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) 
                    next(err);
                
                User.create({
                    username,
					password: hash,
					profile,
					email,
					role,
					
                }).then(user => {
					res.status(201).json(`Registration of username: ${username} is done!`);
					
                }).catch(err);
            });
        }
    })
});

router.post('/login', (req, res, next) => {
    let {username, password} = req.body;
	User.findOne({username})
	.then(user => {
        if (!user) {
            let err = new Error('User not found!');
            err.status = 401;
            return next(err);
        }

		bcrypt.compare(password, user.password) // comparing pass from user input and from database.
		.then(isMatched => {
            if (!isMatched) {
                let err = new Error('Password does not match!');
                err.status = 404;
                return next(err);
            }
            let payload = {
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            }
            jwt.sign(payload, process.env.SECRET, (err, token) => {
                if (err) {
                    return next(err);
                }
                res.json({status: 'Login Sucessful', token: `Bearer ${token}`})
            });

        }).catch(next);

	}).catch(next);
});


module.exports = router;
