const routeTask = require("./task.route");
const routeUser = require("./user.route");

module.exports = (app) => {

  const PATH_API = "/api/v1";

  app.use(PATH_API + "/tasks", routeTask);

  app.use(PATH_API + "/users", routeUser);
};
