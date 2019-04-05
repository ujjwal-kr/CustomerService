'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Task extends Model {
    project() {
        this.belongsTo('App/Models/Project')
    }
}

module.exports = Task
