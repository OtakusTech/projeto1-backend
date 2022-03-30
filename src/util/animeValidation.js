const Joi = require('@hapi/joi');

exports.registerValidation = data => {
    const schema = Joi.object({
        title: Joi.string().max(255).required(),
        creator: Joi.string().max(255).required(),
        user: Joi.string().max(255).required(),
        year: Joi.string().required(),
        synopsis: Joi.object().keys({
            text: Joi.string().max(1000).required(),
            font: Joi.string().required()
        }),
        tags: Joi.array(),
        img: Joi.string()
    });

    return schema.validate(data); 
};