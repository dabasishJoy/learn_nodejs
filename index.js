// dependecies
const http = require("http");

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
app.handleReqRes = (req, res) => {
  res.end("Hello World");
};

// run the application
app.createServer();
