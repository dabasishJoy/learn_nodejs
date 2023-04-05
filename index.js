// dependecies
const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");

//module scafolding - creating an app object
const app = {};

// configuration
app.config = {
  port: 5000,
};

// crete server method
app.createServer = () => {
  // creating server using http module
  const server = http.createServer(app.handleReqRes);
  // emit event
  server.listen(app.config.port, () => {
    console.log(`Server is listeing on port ${app.config.port}`);
  });
};

// hanlde req and res
app.handleReqRes = handleReqRes;
// run the application
app.createServer();
