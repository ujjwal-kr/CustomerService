"use strict";

const Customer = use("App/Models/Customer");
const Database = use("Database");


/**
 * Resourceful controller for interacting with customers
 */
class CustomerController {
  /**
   * Show a list of all customers.
   * GET customers
   *
   * IF LIMIT IS GIVEN, + orders
   * Display limited customers
   * GET customers/?limit="number"?orderBy="desc"
   */

  async index({ request, response }) {
    const query = await request.get();
    if (query.limit||query.orderBy) {
      const customers = await Database.table("customers").orderBy("id", query.orderBy)
      .offset(0).limit(query.limit)

      return response.status(200).json({
        msg: 'Successfully fetched customer with specified limit or order',
        customers
      })
    }
    else {
      const customers = await Database.table("customers").orderBy("id", "desc")
      return response.json({
        msg: "Fetched all customers",
        customers
      });
    }
  }

  /**
   * Create/save a new customer.
   * POST customers
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
   */
  async show({ response, params: { id } }) {
    const customer = await Customer.find(id);
  
    return response.status(200).json({
      msg: "Successfully fetched customer",
      customer
    });
  }

  /**
   * Display a single customer's  projects with the given customers ID. 
   * GET projects/customerID
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
