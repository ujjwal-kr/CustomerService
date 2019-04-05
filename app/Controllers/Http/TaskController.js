'use strict'

const Joi = require('joi')
const Project = use('App/Models/Project')
const Task = use('App/Models/Task')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/**
 * Resourceful controller for interacting with tasks
 */
class TaskController {


  /**
   * Create/save a new task.
   * POST tasks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const body = request.only(['name', 'description', 'project_id'])

    const schema = {
      project_id : Joi.string().required().min(1)
    }

    const result = Joi.validate(request.only(['project_id']), schema)
    if(result.error){
      const errorMsg = result.error.details[0].message
      return response.json({
        errorMsg
      })
    }else{
      const id = await request.all().project_id
      const project = await Project.find(id)
      if(!project){
        return response.json({
          msg: 'Project not found to assign task',
          id
        })
      }else{
        const task = await Task.create(body)
  
        return response.status(201).json({
          message: 'Successfully created a new task.',
          data: task
        }) 
      }
    }
  }

  /**
   * Update task details.
   * PUT or PATCH tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params: { id }, request, response }) {
    const { name, description } = await request.all()
    const task = await Task.find(id)
      task.name = name
      task.description = description

      await task.save()

      return response.status(201).json({
        msg: 'Sucessfully updated task',
        data: task
      })
  }

  /**
   * Delete a task with id.
   * DELETE tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params: { id }, response }) {
    const task = await Task.find(id)
    await task.delete()

    return response.status(201).json({
      msg: 'Sucessfully deleted task',
      id
    })
  }
}

module.exports = TaskController
