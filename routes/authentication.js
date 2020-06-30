const jwt = require('jsonwebtoken');

// jwt verifyUser done testing on 30th June!
function verifyUser(req, res, next) {
    let authHeader = req.headers.authorization;
    if (! authHeader) {
        let err = new Error('No authentication information!');
        err.status = 401;
        return next(err);
    }

    let token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.SECRET, (err, payload) => {
        if (err) {
            let err = new Error('Token could not be found!');
            err.status = 401;
            return next(err);
        } else { // verified!
            req.user = payload;
            next();
        }
    })
};

function verifyOwnerOfInquiry(book, req) {
    if (req.user.id !== book.inquiries.author) {
        let err = new Error('You are allowed to put/delete own inquiry only.');
        err.status = 401;
        return err;
    } else {
		return;
	}
};


module.exports = {
    verifyUser, verifyOwnerOfInquiry
}
