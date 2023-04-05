const handler = {};

handler.userHandler = (requestProperties, callback) => {
  //   call the callback function
  callback(200, {
    messsage: "This is a user handler url",
  });
};

module.exports = handler;
