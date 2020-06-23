const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

router.route('/')
.get((req, res, next) => {
    Book.find()
    .then((books) => {
        res.status(200).json(books);
    }).catch(next);
    // console.log("res from GET request!!!!");
})
    
.post((req, res, next) => {
    const book = {
        title, isbn, author, publication, 
        image, language, totalPage, 
        condition, homeDelivery, category
    } = req.body;

    Book.create(book)
    .then((book) => {
        res.status(201).json(book);
    }).catch(next);
})

.delete((req, res, next) => {
    Book.deleteMany({})
    .then(reply => {
        res.status(200).json(reply);
    }).catch(next);
})

router.route('/:book_id')
.get((req, res, next) => {
    Book.findById(req.params.book_id)
    .then(book => {
        res.status(200).json(book);
    }).catch(next);
})
.put((req, res, next) => {
    Book.findByIdAndUpdate(req.params.book_id, {$set: req.body}, {new: true})
    .then(book => {
        res.status(200).json(book);
    }).catch(next)
})
.delete((req, res, next) => {
    Book.findByIdAndDelete(req.params.book_id)
    .then(reply => {
        res.status(200).json(reply);
    }).catch(next);
});
//------TESTED UPTO HERE---------

module.exports = router;
