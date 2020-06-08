const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('All  Users Will be Displayed Here');
});

router.post('/register', (req, res, next) => {
    res.send('Users will be registered here');
});

router.post('/login', (req, res, next) => {
    res.send("Login will be performed later!!!");
})

module.exports = router;