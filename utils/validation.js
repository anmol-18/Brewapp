const Joi = require('joi');

const validateUser = (userData) => {
    const schema = Joi.object({
        username: Joi.string().min(4).required(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(userData);
};


const validateLogin = (loginUserData) => {
    const schema = Joi.object({
        userName: Joi.string().required(),
        password: Joi.string().required(),
    });
    return schema.validate(loginUserData);
};

module.exports = {
    validateUser,
    validateLogin
}
