const Yup = require("yup");

const schema = Yup.object().shape({
    name: Yup.string()
        .required("نام‌کتاب الزامی می‌باشد"),
});

const bookValidation = (body)=>{
    return schema.validate(body, {abortEarly: false});
};

module.exports = bookValidation;