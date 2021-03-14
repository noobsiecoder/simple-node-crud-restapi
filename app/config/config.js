// Sensitive data from .env file
module.exports = {
  PORT_NUMBER: process.env.PORT_NUMBER,
  SIGN_UP_ROUTE: process.env.SIGNUP_ROUTE,
  SIGN_IN_ROUTE: process.env.SIGNIN_ROUTE,
  UPDATE_ROUTE: process.env.UPDATE_ROUTE,
  LOGOUT_ROUTE: process.env.LOGOUT_ROUTE,
  DELETE_ROUTE: process.env.DELETE_ROUTE,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
};
