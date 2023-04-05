// dependencies
const url = require("url");
const { StringDecoder } = require("string_decoder");
const routes = require("../routes");
const { notFoundHandler } = require("../handler/routesHandler/notFoundHandler");
const { parseJSON } = require("../helpers/utilities");
// module scaffolding
const handler = {};

handler.handleReqRes = (req, res) => {
  // get the whole url and parse
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  // trim the path to make it generic and remove unwanted characters
  const trimPath = path.replace(/^\/+|\/+$/g, "");

  // get the method
  const method = req.method.toLowerCase();

  // get if any query
  const queryString = parsedUrl.query;

  // meta data
  const headersObject = req.headers;
  console.log(headersObject);

  // req payload or body

  // get the decoder with utf-8 encoding
  const decoder = new StringDecoder("utf-8");

  const requestProperties = {
    parsedUrl,
    path,
    trimPath,
    method,
    queryString,
    headersObject,
  };

  //   find out the path
  const choosenHandler = routes[trimPath] ? routes[trimPath] : notFoundHandler;

  let data = "";
  // get the data from buffer usig event
  req.on("data", (buffer) => {
    data += decoder.write(buffer);
  });

  // end the buffer
  req.on("end", () => {
    data += decoder.end();

    // adding data to req properties to get in the req handler
    requestProperties.body = parseJSON(data);

    choosenHandler(requestProperties, (statusCode, payload) => {
      statusCode = typeof statusCode === "number" ? statusCode : 500;
      payload = typeof payload === "object" ? payload : {};

      const payloadString = JSON.stringify(payload);

      // return the final response
      res.setHeader("Content-Type", "application/json"); //defining the content type json object
      res.writeHead(statusCode);
      res.end(payloadString);
    });
  });
};

module.exports = handler;
