const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const auth = require('./authentication');

//-----------------------------Done Debug on June 24th after adding router book/book:id/inquiries/:inquiry_id ---------------------------

router.route('/')
.get((req, res, next) => {
	Book.find()
    .then((books) => {
        res.status(200).json(books);
    }).catch(next);
})
//done Debug
.post(auth.verifyUser, (req, res, next) => {
     const {
        title, author, publication, 
        image, cost,
		condition, category, deliveryArea
	} = req.body;
    Book.create({title, author, publication, 
        image, cost, deliveryArea,
		condition, category, owner: req.user.id})
    .then((book) => {
        res.status(201).json(book);
    }).catch(next);
})

//Havent Done Debug .delete
.delete(auth.verifyUser, auth.verifyAdmin, (req, res, next) => {
    Book.deleteMany()
    .then(reply => {
        res.status(200).json(reply);
    }).catch(next);
});
//Done Debug
router.route('/:book_id')
.get((req, res, next) => {
	Book.findById(req.params.book_id)
    .then(book => {
        res.status(200).json(book);
    }).catch(next);
})
//Done Debug
.put(auth.verifyUser, (req, res, next) => {
	Book.findById(req.params.book_id)
	.then(book => {
		const err = auth.verifyOwnerOfBook(book.owner, req.user.id);
		if (err) 
			return next(err);
		//to avoid update inquiries.
		book.title = req.body.title;
		book.deliveryArea = req.body.deliveryArea;
		book.author = req.body.author;
		book.publication = req.body.publication;
		book.image = req.body.image;
		book.condition = req.body.condition;
		book.category = req.body.category;

		book.save()
		.then(book => {
			res.status(200).json(book);
		}).catch(next);
	}).catch(next);
	   
})
//Done Debug
.delete(auth.verifyUser, (req, res, next) => {
	Book.findById(req.params.book_id)
	.then(book => {
		const err = auth.verifyOwnerOfBook(book.owner, req.user.id);
		if (err) 
			return next(err);
			book.remove()
			.then(reply => {
				res.json(reply);	
			})
	}).catch(next);
});	



//------Done Debug UPTO HERE---------

module.exports = router;
