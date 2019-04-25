'use strict'

const Task = use('App/Models/Task')

class FindTask {
  
  async handle ({params: { id }, request }, next) {
    const task = await Task.find(id)

    if(!task){
      return response.status(404).json({
        success: false,
        msg: 'Task not found',
        id
      })
    }else{
      return await next()
    }
  }
}

module.exports = FindTask
