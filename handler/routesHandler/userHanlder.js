const data = require("../../lib/data");
const { parseJSON } = require("../../helpers/utilities");

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
  // check phone number first because considering that unique key
  const phone =
    typeof requestProperties.queryString.phone === "string" &&
    requestProperties.queryString.phone.trim().length === 11
      ? requestProperties.queryString.phone
      : false;
  if (phone) {
    // lookup the user
    data.read("users", phone, (err, u) => {
      const user = { ...parseJSON(u) };
      if (!err && user) {
        delete user.password;
        callback(200, user);
      } else {
        callback(404, {
          error: "Requested user was not found!",
        });
      }
    });
  } else {
    callback(404, {
      error: "Requested user was not found!",
    });
  }
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

  if (firstName && lastName && phone && tosAgreement && password) {
    // read the data and find the user if not exist
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
        data.create("users", phone, password, userObject, (err2) => {
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
handler._users.put = (requestProperties, callback) => {
  // find unique user with phone number
  // check the phone number if valid
  const phone =
    typeof requestProperties.body.phone === "string" &&
    requestProperties.body.phone.trim().length === 11
      ? requestProperties.body.phone
      : false;

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

  if (phone) {
    if (firstName || lastName) {
      // loopkup the user
      data.read("users", phone, (err1, uData) => {
        const userData = { ...parseJSON(uData) };

        if (!err1 && userData) {
          if (firstName) {
            userData.firstName = firstName;
          }
          if (lastName) {
            userData.firstName = firstName;
          }

          // store to database
          data.update("users", phone, userData, (err2) => {
            if (!err2) {
              callback(200, {
                message: "User was updated successfully!",
              });
            } else {
              callback(500, {
                error: "There was a problem in the server side!",
              });
            }
          });
        } else {
          callback(400, {
            error: "You have a problem in your request!",
          });
        }
      });
    } else {
      callback(400, {
        error: "You have a problem in your request!",
      });
    }
  } else {
    callback(400, {
      error: "Invalid phone number. Please try again!",
    });
  }
};
// delete request

handler._users.delete = (requestProperties, callback) => {
  // if phone number is valid
  const phone =
    typeof requestProperties.queryString.phone === "string" &&
    requestProperties.queryString.phone.trim().length === 11
      ? requestProperties.queryString.phone
      : false;

  if (phone) {
    // lookup the user
    data.read("users", phone, (err1, userData) => {
      if (!err1 && userData) {
        data.delete("users", phone, (err2) => {
          if (!err2) {
            callback(200, {
              message: "User was successfully deleted!",
            });
          } else {
            callback(500, {
              error: "server  error!",
            });
          }
        });
      } else {
        callback(500, {
          error: "There was a server side error!",
        });
      }
    });
  } else {
    callback(400, {
      error: "There was a problem in your request!",
    });
  }
};

module.exports = handler;
