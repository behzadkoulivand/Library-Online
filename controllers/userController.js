const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const { where } = require('sequelize');

// exports.login = async (req, res) => {
//     try {
//         const {email, password} = req.body;
//         const user = await User.findOne({where: {email: email}});

//         if(!user)
//             return res.status(400).json("کاربری با این ایمیل ثبت نشده");
        
//         const isMatch = await bcrypt.compare(password, user.password);

//         if(!isMatch)
//             return res.status(400).json("کلمه عبور اشتباه است");
        
//         const payload = {
//             user: {
//                 id: user.id
//             }
//         };
//         jwt.sign(payload, "secret", 
//             {
//                 expiresIn: 3600
//             }, (err, token) =>{
//                 if(err) throw err;
//                 res.status(200).json(token);
//             });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json("خطایی وجود دارد");
//     }
// }

// exports.getList = async (req, res) => {
//     try {
//         const list = await User.findAll();
//         if(list.length == 0)
//             return res.status(400).json("کاربری در پایگاه داده نیست");
//         res.status(200).json(list);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json("خطایی وجود دارد");
//     }
// }

// exports.createUser = async (req, res) =>{
//     try {
//         const {userName, email, password} = req.body;

//         const user = await User.findOne({where: {email: email}});
//         if(user) return res.status(400).json("کاربری با این ایمیل قبلا ثبت شده است");

//         const hashPassword = await bcrypt.hash(password, 10);

//         await User.create({userName, email, password: hashPassword});
        
//         res.status(200).json("کاربر با موفقیت ثبت شد");
//     } catch (err) {
//         console.log(err);
//         res.status(500).json("خطایی وجود دارد");
//     }
    
// }