const Book = require('../models/Book');
const bookValidation = require('../models/secure/bookValidation');

exports.register = async(req, res, next) =>{
    try {
        await bookValidation(req.body);

        await Book.create(req.body);
        res.status(200).json(`کتاب با موفقیت ثبت شد`);
    } catch (err) {
        next(err);
    }
};