'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Customers 
Route.get('customers', 'CustomerController.index')
Route.post('customers', 'CustomerController.store').middleware(['validate', 'cnull'])
Route.get('customers/:id', 'CustomerController.show').middleware(['findCustomer'])
Route.patch('customers/:id', 'CustomerController.update').middleware(['findCustomer', 'validate', 'cnull'])
Route.delete('customers/:id', 'CustomerController.destroy').middleware(['findCustomer'])

// GET Customer's Projects
Route.get('customers/:id/projects', 'CustomerController.fetchWithProjects').middleware(['findCustomer'])

//Projects
Route.post('customers/:id/projects', 'ProjectController.store').middleware('findCustomer', 'validate')
Route.patch('projects/:id', 'ProjectController.update').middleware(['validate', 'findProject', 'cnull'])
Route.delete('projects/:id', 'ProjectController.destroy').middleware(['findProject'])

// GET project's tasks
Route.get('projects/:id/tasks', 'ProjectController.fetchWithTasks').middleware(['findProject'])

//tasks
Route.post('projects/:id/tasks', 'TaskController.store').middleware('findProject','validate')
Route.patch('tasks/:id', 'TaskController.update').middleware(['validate', 'cnull', 'findTask'])
Route.delete('tasks/:id', 'TaskController.destroy').middleware(['findTask'])