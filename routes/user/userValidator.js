const Joi = require('joi');

const registerValidation = (name, email, password) => {

    const schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),

        password: Joi.string()
            .min(3)
            .max(15)
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),

        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required()
    })


    return schema.validate({ name, email, password });
}

const userValidator = { registerValidation };

module.exports = userValidator;