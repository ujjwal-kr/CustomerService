'use strict'
const Joi = require('joi')
const Project = use('App/Models/Project')
const Customer = use('App/Models/Customer')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with projects
 */
class ProjectController {

  /**
   * Create/save a new project.
   * POST projects
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const body = await request.only(['name', 'description', 'customer_id'])

    const schema = {
      customer_id : Joi.string().required().min(1)
    }
    const result = Joi.validate(request.only(['customer_id']), schema)
    if (result.error){
      const errorMsg = result.error.details[0].message
      console.log(errorMsg)
      return response.status(400).json({
        errorMsg
      })
    }else{
      const id = await request.all().customer_id
      const customer = await Customer.find(id)
      if(!customer){
        return response.json({
          msg: 'Customer not found to assign project',
          id
        })
      }else{
        const project = await Project.create(body)
        return response.status(201).json({
          message: 'Successfully created a new project for the customer.',
          project
        }) 
      }
    }
  }

  /**
   * Display a single customer's  projects with the given customers ID.
   * GET project/:id/tasks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async fetchWithTasks({ response, params: { id } }) {
    const project = await Project.find(id)
    const tasks = await project.tasks().fetch()

    return response.status(200).json({
      msg: "Found tasks for the given project",
      project,
      tasks
    });
  }  

  /**
   * Update project details.
   * PUT or PATCH projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params: { id }, request, response }) {
    const { name, description } = await request.all()

    const project = await Project.find(id)
      project.name = name
      project.description = description

      await project.save()

      return response.status(201).json({
        msg: 'Sucessfully updated project',
        project
      })
  }

  /**
   * Delete a project with id.
   * DELETE projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params: { id }, request, response }) {
    const project = await Project.find(id)

        await project.delete()
        return response.status(201).json({
          msg: 'Sucessfully deleted project',
          id
        })
    }
}

module.exports = ProjectController
