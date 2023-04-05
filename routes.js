const { sampleHandler } = require("./handler/routesHandler/sampleHandler");
const { userHandler } = require("./handler/routesHandler/userHanlder");
const { tokenHandler } = require("./handler/routesHandler/tokenHandler");

const routes = {
  sample: sampleHandler,
  user: userHandler,
  token: tokenHandler,
};
module.exports = routes;
