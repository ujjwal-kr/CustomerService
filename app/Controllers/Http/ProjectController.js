'use strict'
const Project = use('App/Models/Project')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

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
  async store ({ request, response, params: { id } }) {
    const project = new Project()

    project.name = await request.all().name
    project.description = await request.all().description
    project.customer_id = id

    await project.save()
    return response.status(201).json({
       msg: 'Project assigned to customer',
       project
    })
  }

  /**
   * Display a single customer's  projects with the given customers ID.
   * GET project/:id/tasks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
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
        msg: 'Successfully updated project',
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
          msg: 'Successfully deleted project',
          id
        })
  }
}

module.exports = ProjectController
