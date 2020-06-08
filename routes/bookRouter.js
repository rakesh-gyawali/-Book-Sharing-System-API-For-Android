const express = require('express');
const router = express.Router();
router.route('/')
.get((req, res, next) => {
    res.send('Get is working!!');
 
})

.post((req, res, next) => {
    res.send('Post is working');
  
})

.delete((req, res, next) => {
    res.send('Delete is working');
})

router.route('/:book_id')
.get((req, res, next) => {
    res.send('/:book_id: Get is working!! Testing');
})

.put((req, res, next) => {
    res.send('/:book_id: Put is working');
})

.delete((req, res, next) => {
    res.send('/:book_id: Delete is working');
})

module.exports = router;