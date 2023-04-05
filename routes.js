const { sampleHandler } = require("./handler/routesHandler/sampleHandler");
const { userHandler } = require("./handler/routesHandler/userHanlder");

const routes = {
  sample: sampleHandler,
  user: userHandler,
};
module.exports = routes;
