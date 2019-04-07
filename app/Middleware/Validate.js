'use strict'

const Joi = require('joi')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Validate {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response }, next) {
    const schema = {
      name: Joi.string().min(4).required(),
      description: Joi.string().min(6).required()
    }

    const result = Joi.validate(request.only(['name', 'description']), schema)

    if (result.error){
      const errorMsg = result.error.details[0].message
      return response.status(400).json({
        errorMsg
      })
    }else{
      return await next()
    }
  }
}

module.exports = Validate
