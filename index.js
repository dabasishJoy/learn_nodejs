// dependecies
const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");
const environment = require("./helpers/environments");

//module scafolding - creating an app object
const app = {};

// crete server method
app.createServer = () => {
  // creating server using http module
  const server = http.createServer(app.handleReqRes);
  // emit event
  server.listen(environment.port, () => {
    console.log(`Server is listeing on port ${environment.port}`);
  });
};

// hanlde req and res
app.handleReqRes = handleReqRes;
// run the application
app.createServer();
