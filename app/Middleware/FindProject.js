'use strict'

const Project = use('App/Models/Project')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class FindProject {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ response, params: { id } }, next) {
    const project = await Project.find(id)

    if(!project){
      return response.status(404).json({
        msg: 'Project not found',
        id
      })
    }else{
     return await next()
    }
  }
}

module.exports = FindProject
