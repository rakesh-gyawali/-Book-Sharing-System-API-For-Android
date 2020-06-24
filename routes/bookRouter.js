const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

//-----------------------------Tested on June 24th after adding router upto book/book:id/inquiries/:inquiry_id ---------------------------
router.route('/')
.get((req, res, next) => {
    Book.find()
    .then((books) => {
        res.status(200).json(books);
    }).catch(next);
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
    const book = {
        title, isbn, author, publication, 
        image, language, totalPage, 
        condition, homeDelivery, category
    } = req.body;
    Book.findByIdAndUpdate(req.params.book_id, {$set: book}, {new: true})
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

router.route('/:book_id/inquiries')
.get((req, res, next) => {
    Book.findById(req.params.book_id)
    .then(book => {
        res.status(200).json(book.inquiries);
    }).catch(next);
})
.post((req, res, next) => {
    const inq = {
        inquiry, author
    } = req.body;
    Book.findById(req.params.book_id)
    .then(book => {
         book.inquiries.push(inq);
         book.save()
         .then((book) => {
             res.status(201).json(book.inquiries);
         }).catch(next);   
    }).catch(next);
})
.delete((req, res, next) => {
    Book.findById(req.params.book_id)
    .then(book => {
        book.inquiries = [];
        book.save()
        .then(book => {
            res.status(200).json(book.inquiries);
        }).catch(next);
    }).catch(next);
})

router.route("/:book_id/inquiries/:inquiry_id")
.get((req, res, next) => {
    Book.findById(req.params.book_id)
    .then(book =>  {
        const inquiry = book.inquiries.id(req.params.inquiry_id); 
        res.status(200).json(inquiry);
    })
})

.put((req, res, next) => {
    Book.findById(req.params.book_id)
    .then(book => {
       const inq =  book.inquiries.id(req.params.inquiry_id);
       inq.inquiry = req.body.inquiry; //allows to update inquiry field only!
       book.save()
       .then((updatedInquiry) => {
        res.status(200).json(updatedInquiry);
       }).catch(next);
    })
})

.delete((req, res, next) => {
    Book.findById(req.params.book_id)
    .then(book => {
        book.inquiries = book.inquiries.filter(inquiry => {
            return inquiry.id !== req.params.inquiry_id;
        })
        book.save()
        .then((updatedBook) => {
            res.status(200).json(updatedBook.inquiries);
        }).catch(next);
    }).catch(next);
})

//------TESTED UPTO HERE---------

module.exports = router;
