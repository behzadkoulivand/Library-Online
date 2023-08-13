const Yup = require("yup");

const schema = Yup.object().shape({
    userCode: Yup.number("کد عضویت باید عدد باشد").
        required("کدعضویت الزامی می‌باشد"),
    fullName: Yup.string()
        .required("نام و نام خانوادگی الزامی می باشد")
        .min(4, "نام و نام خانوادگی نباید کمتر از 4 کاراکتر باشد")
        .max(255, "نام و نام خانوادگی نباید بیشتر از 255 کاراکتر باشد"),
    password: Yup.string()
        .min(4, "کلمه عبور نباید کمتر از 4 کاراکتر باشد")
        .max(255, "کلمه عبور نباید بیشتر از 255 کاراکتر باشد")
        .required("کلمه عبور الزامی می باشد"),
    confirmPassword: Yup.string()
        .required("تکرار کلمه عبور الزامی می باشد")
        .oneOf([Yup.ref("password"), null], "کلمه های عبور یکسان نیستند"),
    phone: Yup.string()
        .required("شماره تلفن الزامی است")
});

const userValidation = (body)=>{
    return schema.validate(body, {abortEarly: false});
};

module.exports = userValidation;