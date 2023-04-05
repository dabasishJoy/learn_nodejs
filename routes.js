const { sampleHandler } = require("./handler/routesHandler/sampleHandler");
const { userHandler } = require("./handler/routesHandler/userHanlder");
const { tokenHandler } = require("./handler/routesHandler/tokenHandler");
const { checkHandler } = require("./handler/routesHandler/checkHandler");

const routes = {
  sample: sampleHandler,
  user: userHandler,
  token: tokenHandler,
  check: checkHandler,
};
module.exports = routes;
