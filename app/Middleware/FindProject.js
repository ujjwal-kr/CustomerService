'use strict'

const Project = use('App/Models/Project')


class FindProject {

  async handle ({ response, params: { id } }, next) {
    const project = await Project.find(id)

    if(!project){
      console.log('Project Not Found')
      return response.status(404).json({
        success: false,
        msg: 'Project not found',
        id
      })
    }else{
     return await next()
    }
  }
}

module.exports = FindProject