const handler = {};

handler.userHandler = (requestProperties, callback) => {
  //   call the callback function
  const acceptedMethods = ["get", "post", "put", "delete"];
  if (acceptedMethods.indexOf(requestProperties.method) > -1) {
    handler._users[requestProperties.method](requestProperties, callback);
  } else {
    callback(405);
  }
};

// scafholding for user
handler._users = {};

// get request
handler._users.get = (requestProperties, callback) => {
  console.log(requestProperties);
  callback(200);
};
// post request / create user
handler._users.post = (requestProperties, callback) => {
  // validation
  const firstName =
    typeof requestProperties.body.firstName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName
      : false;

  const lastName =
    typeof requestProperties.body.lastName === "string" &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName
      : false;

  const phone =
    typeof requestProperties.body.phone === "string" &&
    requestProperties.body.phone.trim().length === 11
      ? requestProperties.body.phone
      : false;

  const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password
      : false;

  const tosAgreement =
    typeof requestProperties.body.tosAgreement === "boolean" &&
    requestProperties.body.tosAgreement
      ? requestProperties.body.tosAgreement
      : false;

  if (firstName && lastName && phone && password && tosAgreement) {
    // make sure that the user doesn't already exists
    data.read("users", phone, (err1) => {
      if (err1) {
        const userObject = {
          firstName,
          lastName,
          phone,
          password: hash(password),
          tosAgreement,
        };
        // store the user to db
        data.create("users", phone, userObject, (err2) => {
          if (!err2) {
            callback(200, {
              message: "User created successfully!",
            });
          } else {
            callback(500, { error: "User Creation Failed!" });
          }
        });
      } else {
        callback(500, {
          error: "There is server error!",
        });
      }
    });
  } else {
    callback(400, {
      error: "Request Error! Try Again",
    });
  }
};
// put request
handler._users.put = (requestProperties, callback) => {};
// delete request

handler._users.delete = (requestProperties, callback) => {};
module.exports = handler;
