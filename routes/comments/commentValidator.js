const Joi = require('joi');

const commentPostValidation = (movieId, text) => {

    const schema = Joi.object({
        movieId: Joi.string()
            .required(),

        text: Joi.string()
            .min(5)
            .max(300)
            .required(),
    })

    return schema.validate({ movieId, text });
}

const commentValidator = { commentPostValidation };

module.exports = commentValidator;