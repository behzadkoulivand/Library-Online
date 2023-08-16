const Book = require('../models/Book');
const bookValidation = require('../models/secure/bookValidation');

exports.register = async (req, res, next) => {
    try {
        await bookValidation(req.body);

        await Book.create(req.body);
        res.status(200).json(`کتاب با موفقیت ثبت شد`);
    } catch (err) {
        next(err);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const book = await Book.findByPk(_id);
        if (!book) {
            const error = new Error("کتابی با این کدکتاب پیدا نشد");
            error.statusCode = 404;
            throw error;
        }
        const bookName = await book.name;
        await Book.destroy({ where: { id: req.params.id } });
        res.status(200).json(`کتاب ${bookName} حذف شد`);
    } catch (err) {
        next(err);
    }
};

exports.getBooks = async (req, res, next) => {
    try {
        const books = await Book.findAll();
        if (!books) {
            const error = new Error("کتابی هنوز ثبت نشده است");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json(books);

    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const book = await Book.findByPk(_id);
        if (!book) {
            const error = new Error("کتابی با این کدکتاب پیدا نشد");
            error.statusCode = 404;
            throw error;
        }
        const { name, author, reserved, reservator } = req.body;
        if (!name && !author && !reserved && !reservator) {
            const error = new Error("در خواست شما باید محتوا داشته باشد و آن چیزی را که می‌خواهید تغییر دهید ارسال کنید.");
            error.statusCode = 404;
            throw error;
        }

        if (name) {
            book.name = name;
            book.save();
        }
        if (author) {
            book.author = author;
            book.save();
        }
        if (reserved) {
            book.reserved = reserved;
            book.save();
        }
        if (reservator) {
            book.reservator = reservator;
            book.save();
        }
        res.status(200).json(book);
    } catch (err) {
        next(err);
    }

}