const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const userValidation = require('../models/secure/userValidation');

exports.login = async (req, res, next) => {
    const {userCode, password} = req.body;
    try {
        const user = await User.findOne({ where: {userCode: userCode} });

        if(!user){
            const error = new Error("کاربری با این کدعضویت ثبت نشده است");
            error.statusCode = 404;
            throw error;
        }
            
        const isMatch = await bcrypt.compare(password, user.password);

        if(isMatch){
            const token = jwt.sign(
                {
                    user: {
                        // userId: user._id.toString(),
                        userCode: user.userCode,
                        fullname: user.fullname
                    },
                },
                process.env.JWT_SECRET
            );
            res.status(200).json({ token, userCode: user.userCode });
        } else {
            const error = new Error("آدرس ایمیل یا کلمه عبور اشتباه است");
            error.statusCode = 422;
            throw error;
        }
            
        
    } catch (err) {
        next(err);
        
    }
};

exports.createUser = async (req, res, next) =>{
    try {
        const {userCode, fullName, password, phone} = req.body;
        await userValidation(req.body);

        const user = await User.findOne({where: { userCode: userCode }});
        if(user){
            const error = new Error("کاربری با این کدعضویت موجود است");
            error.statusCode = 422;
            throw error;
        } 

        const hashPassword = await bcrypt.hash(password, 10);

        await User.create({userCode, fullName, password: hashPassword, phone});
        
        res.status(200).json("عضویت با موفقیت انجام شد");
    } catch (err) {
        next(err);
    }
    
}