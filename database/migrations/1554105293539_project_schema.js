'use strict'

const Schema = use('Schema')

/** @type {import('@adonisjs/lucid/src/Schema')} */

class ProjectSchema extends Schema {
  up() {
    this.create('projects', table => {
      table.increments()
      table.timestamps()
      table.string('name')
      table.text('description')
      table.integer('customer_id').unsigned() //Make sure that its a positive ineger

      
      table                       //passing some config to the customer_id field
        .foreign('customer_id')
        .references('customers.id')
        .onDelete('cascade')
    })
  }

  down() {
    this.drop('projects')
  }
}

module.exports = ProjectSchema