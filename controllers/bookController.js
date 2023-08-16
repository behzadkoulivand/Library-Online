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

exports.delete = async (req, res, next) =>{
    try {
        const _id = req.params.id;
        const book = await Book.findByPk(_id);
        if(!book){
            const error = new Error("کتابی با این کدکتاب پیدا نشد");
            error.statusCode = 404;
            throw error;
        }
        const bookName = await book.name;
        await Book.destroy({where: {id: req.params.id}});
        res.status(200).json(`کتاب ${bookName} حذف شد`);
    } catch (err) {
        next(err);
    }
}