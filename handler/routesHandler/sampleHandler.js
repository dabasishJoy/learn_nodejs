const handler = {};

handler.sampleHandler = (requestProperties, callback) => {
  //   call the callback function
  callback(200, {
    messsage: "This is a sample url",
  });
};

module.exports = handler;
