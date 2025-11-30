const routeTask = require("./task.route");
const routeUser = require("./user.route");
const private = require("../middlewares/auth.middleware");

module.exports = (app) => {
  const PATH_API = "/api/v1";

  app.use(PATH_API + "/tasks", private.auth, routeTask);

  app.use(PATH_API + "/users", routeUser);
};
