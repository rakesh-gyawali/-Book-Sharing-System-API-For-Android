const express = require('express');
const router = express.Router();

router.route('/')
.get((req, res, next) => {
    res.send('Get is working!!');
    next();
})

.post((req, res, next) => {
    res.send('Post is working');
    next();
})

.delete((req, res, next) => {
    res.send('Delete is working');
    next();
})

router.route('/:category_id')
.get((req, res, next) => {
    res.send('/:category_id: Get is working!!');
    next();
})

.put((req, res, next) => {
    res.send('/:category_id: Put is working');
    next();
})

.delete((req, res, next) => {
    res.send('/:category_id: Delete is working');
    next();
})


module.exports = router;