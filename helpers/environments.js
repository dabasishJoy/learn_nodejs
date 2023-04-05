// dependencies

// module scaffolding
const environments = {};

// staging environment
environments.staging = {
  port: 5000,
  envName: "staging",
  secretKey: "alsdkfklajsdfkl",
  maxChecks: 5,
  twilio: {
    fromPhone: "+15856327408",
    accountSid: "AC1324f8740701314ccf53acfbb6318e9a",
    authToken: "df13ca14a8a7fdcd6183877e91c3ce99",
  },
};

// production environment
environments.production = {
  port: 3000,
  envName: "production",
  secretKey: "alsdkfklajsdfkl",
  maxChecks: 5,
  twilio: {
    fromPhone: "+15856327408",
    accountSid: "AC1324f8740701314ccf53acfbb6318e9a",
    authToken: "df13ca14a8a7fdcd6183877e91c3ce99",
  },
};

// determine which environment was passed
const currentEnvironment =
  typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV : "staging";

// export corresponding environment object
const environmentToExport =
  typeof environments[currentEnvironment] === "object"
    ? environments[currentEnvironment]
    : environments.staging;

// export module
module.exports = environmentToExport;
