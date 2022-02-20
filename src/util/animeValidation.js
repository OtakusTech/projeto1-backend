const Joi = require('@hapi/joi');
const { JsonWebTokenError } = require('jsonwebtoken');

exports.registerValidation = data => {
    const schema = Joi.object({
        title: Joi.string().max(255).required(),
        creator: Joi.string().max(255).required(),
        year: Joi.string().required(),
        synopsis: Joi.object().keys({
            text: Joi.string().max(500).required(),
            font: Joi.string().required()
        })
    });

    return schema.validate(data);
};