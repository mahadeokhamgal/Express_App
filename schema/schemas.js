const Joi = require("joi");

const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(1).required(),
})

module.exports = { userSchema };