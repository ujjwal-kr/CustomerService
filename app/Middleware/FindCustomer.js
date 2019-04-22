'use strict'

const Customer = use('App/Models/Customer')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class FindCustomer {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ response, params: { id } }, next) {
    const customer = await Customer.find(id)

    if(!customer){
      console.log('Customer Not Found')
      return response.status(404).json({
        success: false,
        msg: 'customer not found',
        id
      })
    }else{
      return await next()   //Fire the controller
    }
  }
}

module.exports = FindCustomer
