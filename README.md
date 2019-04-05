# Adonis Customer Service API

## A simple RESTful service for a shop/startup to manage its customers, customer's projects and project's tasks.


## Project Overview      ~Request Arcitechture
- Customers
-- name, description
- Projects
-- name, description, customer_id
- Tasks
-- name, description, project_id

# Well, this can help

- [A cheatsheet to help you as you build a simple API using AdonisJS framework for NodeJS.](https://gist.github.com/ujjwal-kr/2a8e8873730771fa2ebfe27680e677b6)

# Setup

1. Install Adonis CLI `npm i -g @adonisjs/cli`
2. Copy this Repository and `cd` into it.
3. Run `npm install`
4. Install `npm install --save mysql`
5. Configure `.env file if needed`
6. Run `adonis migration:run`
7. Put some crap in the database { refer to the src code if needed for the request mapping }
8. To view routes, run `adonis route:list`
9. Run `adonis serve --dev`

# Here are the routes

1. customers       GET     ( To get all the customers )
2. customers       Post    ( To post a new customer{ see customerController.js for details } )
3. customers/:id   Get     ( To get a single customer by its ID )
4. customers/:id   PATCH   ( Update a customer by its ID )
5. customers/:id   DELETE  ( Delete a customer by its ID )

6. customers/:id/projects   GET     ( To get all the projects of the customer by the given customer id )

7. projects         POST    ( To post a project { see projectController.js for details })
8. projects/:id     PATCH   ( Update a project by its ID )
9. projects/:id     DELETE   ( Delete a project by its ID )

8. projects/:id/tasks   GET     ( To get all the tasks of the project by given ID )

9. tasks    POST    ( To post a task { see taskController.js for details )

10. tasks/:id     PATCH   ( Update a task by its ID )
11. tasks/:id     DELETE   ( Delete a task by its ID )

