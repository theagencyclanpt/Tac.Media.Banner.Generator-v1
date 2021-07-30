const Router = require("express").Router();

class DashboardController {
  constructor() {}

  Mount() {
    Router.get("/", (request, response) => {
      response.render("dashboard");
    });

    return Router;
  }
}

module.exports = DashboardController;
