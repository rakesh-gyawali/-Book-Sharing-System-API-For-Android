const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();
//.get Tests done!!
router.route('/')
.get((req, res, next) => {
	User.find({})
	.then(Users => {
		res.status(200).json(Users);
	}).catch(next);
});

router.route('/:user_id')
.get((req, res, next) => {
	User.findById(req.params.user_id)
	.populate('profile')
	.then(User => {
		res.status(200).json(User);
	}).catch(next);
});

// Register:Test Done!!
// Login: Test Done !!(Jwt token in generated successfully!)
router.post('/register', (req, res, next) => {
    let {
        username,
        password,
		email,
		role, 
		profile
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
					email,
					role,
					profile
					
                }).then(user => {
					res.status(201).json({status: "register success!"});
                }).catch(next);
            });
        }
    }).catch(next);
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

		bcrypt.compare(password, user.password) 
		.then(isMatched => {
            if (!isMatched) {
                let err = new Error('Password does not match!');
                err.status = 404;
                return next(err);
            }
            let payload = {
                username: user.username,
				role: user.role,
				profile: user.profile,
				id: user.id
			}
            jwt.sign(payload, process.env.SECRET, (err, token) => {
                if (err) {
                    return next(err);
                }
                res.json({status: 'Login Sucessful', token: `Bearer ${token}`, id: user.id})
            });

        }).catch(next);

	}).catch(next);
});


module.exports = router;
