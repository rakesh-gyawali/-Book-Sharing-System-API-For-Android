const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const auth = require('./authentication');
const User = require('../models/User');

//-----------------------------Tested on June 24th after adding router book/book:id/inquiries/:inquiry_id ---------------------------

router.route('/')
.get((req, res, next) => {
	Book.find()
	.populate('category')
	.populate('owner')
    .then((books) => {
        res.status(200).json(books);
    }).catch(next);
})
    
.post((req, res, next) => {
    const book = {
        title, isbn, author, publication, 
        image, language, totalPage, 
		condition, homeDelivery, category,
		owner
	} = req.body;
	
    Book.create(book)
    .then((book) => {
        res.status(201).json(book);
    }).catch(next);
})

.delete((req, res, next) => {
    Book.deleteMany()
    .then(reply => {
        res.status(200).json(reply);
    }).catch(next);
})

router.route('/:book_id')
.get((req, res, next) => {
	Book.findById(req.params.book_id)
	.populate('category')
	.populate('owner')
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

.get(auth.verifyUser, (req, res, next) => {

    Book.findById(req.params.book_id)
    .then(book => {
        res.status(200).json(book.inquiries);
    }).catch(next);
})
.post(auth.verifyUser , auth.verifyUser, (req, res, next) => {
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
.delete(auth.verifyUser, (req, res, next) => {

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
.get(auth.verifyUser, (req, res, next) => {
    Book.findById(req.params.book_id)
    .then(book =>  {
        const inquiry = book.inquiries.id(req.params.inquiry_id); 
        res.status(200).json(inquiry);
    })
})

.put(auth.verifyUser, (req, res, next) => {
    Book.findById(req.params.book_id)
    .then(book => {
		const err = auth.verifyOwnerOfInquiry(book, req);
		if (err) 
			return next(err);
	
		const inq = book.inquiries.id(req.params.inquiry_id);
		inq.inquiry = req.body.inquiry; // allows to update inquiry field only!
		book.save().then((book) => {
			res.status(200).json(book.inquiries);
		}).catch(next);
    })
})

.delete(auth.verifyUser, (req, res, next) => {

    Book.findById(req.params.book_id)
    .then(book => {
		const err = auth.verifyOwnerOfInquiry(book, req);
		if (err) 
			return next(err);

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
