const Reserve = require('../models/Reserve');
const Book = require('../models/Book');

exports.borrowBook = async (req, res, next) => {
    try {
        const bookId = req.params.id;

        const book = await Book.findByPk(bookId);
        if (!book) {
            const error = new Error("کتابی با این کدکتاب پیدا نشد");
            error.statusCode = 404;
            throw error;
        }

        if (book.reserved === true) {
            const error = new Error("کتاب درخواست‌شده امانت داده شده‌است و موجود نمی‌باشد");
            error.statusCode = 401;
            throw error;
        }
        await Reserve.create({
            user: req.userCode,
            book: bookId
        });
        
        book.reserved = true;
        book.reservator = req.userCode;
        book.save();
        res.status(200).json(["کتاب زیر برای شما رزرو شد", book]);

    } catch (err) {
        next(err);
    }
}