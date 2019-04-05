'use strict'

const Task = use('App/Models/Task')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class FindTask {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({params: { id }, request }, next) {
    const task = await Task.find(id)

    if(!task){
      return response.status(404).json({
        msg: 'Task not found',
        id
      })
    }else{
      return await next()
    }
  }
}

module.exports = FindTask
