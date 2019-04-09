'use strict'

const Task = use('App/Models/Task')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

class TaskController {

  /**
   * Create/save a new task.
   * POST tasks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, params: { id } }) {
    const task = new Task()

    task.name = await request.all().name
    task.description = await request.all().description
    task.project_id = id
    await task.save()

    return response.status(201).json({
      msg: 'Successfully asigned task for the Project',
      task
    })
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
        msg: 'Successfully updated task',
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
      msg: 'Successfully deleted task',
      id
    })
  }
}

module.exports = TaskController
