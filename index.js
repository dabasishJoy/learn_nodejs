// dependecies
const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");
const environment = require("./helpers/environments");
const data = require("./lib/data");

//module scafolding - creating an app object
const app = {};

// testing filesystem
data.create(
  "test",
  "newFile",
  { name: "Dabasish", lastname: "Das", Role: "Operational" },
  (err) => {
    console.log("The error", err);
  }
);

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
