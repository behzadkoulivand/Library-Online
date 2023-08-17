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
};

exports.returnBook = async (req, res, next) => {
    try {
        const id = req.params.id;

        const borrow = await Reserve.findOne({ where: { book: id } }) || await Reserve.findByPk(id);

        if (!borrow) {
            const error = new Error("امانت مورد نظر یافت نشد");
            error.statusCode = 404;
            throw error;
        }

        const bookId = borrow.book;
        const book = await Book.findByPk(bookId);
        book.reserved = false;
        book.reservator = 0;
        book.save();

        await Reserve.destroy({ where: { id } });
        res.status(200).json("کتاب مورد نظر برگشت داده شد");

    } catch (err) {
        next(err);
    }
}