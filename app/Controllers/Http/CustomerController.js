"use strict";

const Customer = use("App/Models/Customer");
const Database = use("Database");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/**
 * Resourceful controller for interacting with customers
 */
class CustomerController {
  /**
   * Show a list of all customers.
   * GET customers
   *
   * IF LIMIT IS GIVEN,
   *
   * Display limited customers
   * GET customers/:limit?
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index({ request, response }) {
    const query = await request.get();
    console.log(query)
    if (query.limit||query.orderBy) {
      const limitedCustomers = await Database.table("customers")
      .orderBy("id", query.orderBy)
      .offset(0)
      .limit(query.limit)

      return response.status(200).json({
        msg: 'Sucessfully fetched customer with specified limit',
        limitedCustomers
      })
    }
    else {
      const customers = await Customer.all();
      return response.json({
        msg: "Fetched all customers",
        customers
      });
    }
  }

  /**
   * Create/save a new customer.
   * POST customers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const body = await request.only(["name", "description"]);

    const customer = await Customer.create(body);
    return response.status(201).json({
      msg: "Post Created Successfully",
      customer
    });
  }

  /**
   * Display a single customer.
   * GET customers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({ response, params: { id } }) {
    const customer = await Customer.find(id);

    return response.status(200).json({
      msg: "Sucessfully fetched customer",
      data: customer
    });
  }

  /**
   * Display a single customer's  projects with the given customers ID.
   * GET projects/customerID
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async fetchWithProjects({ response, params: { id } }) {
    const customer = await Customer.find(id);
    const projects = await customer.projects().fetch();

    return response.status(200).json({
      msg: "Found projects for the given customer",
      customer,
      projects
    });
  }

  /**
   * Update customer details.
   * PUT or PATCH customers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ request, response, params: { id } }) {
    const customer = await Customer.find(id);
    const { name, description } = await request.all();

    customer.name = name;
    customer.description = description;
    await customer.save();

    return response.status(201).json({
      msg: "Succesfully updated customer",
      customer
    });
  }

  /**
   * Delete a customer with id.
   * DELETE customers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, response }) {
    const customer = await Customer.find(id);

    await customer.delete();
    return response.status(201).json({
      msg: "Succesfully deleted customer",
      id
    });
  }
}

module.exports = CustomerController;
