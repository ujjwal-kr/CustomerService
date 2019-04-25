'use strict'

const Joi = require('joi')
const schema = require('./schemas/validate.schema')

class Validate {
  async handle ({ request, response }, next) {
    const result = Joi.validate(request.only(['name', 'description']), schema)

    if (result.error){
      const errorMsg = result.error.details[0].message
      return response.status(400).json({
        success: false,
        errorMsg
      })
    }else{
      return await next()
    }
  }
}

module.exports = Validate
