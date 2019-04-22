const Joi = require('joi')


const schema = {
    name: Joi.string().min(4).required(),
    description: Joi.string().min(6).required(),
}

module.exports = schema