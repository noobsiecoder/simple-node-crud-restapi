// { URI } variables from .env
const URI = {
  PORT_NUMBER: process.env.PORT_NUMBER,
};

// { ROUTE } variables from .env
const ROUTE = {
  SIGN_UP_ROUTE: process.env.SIGNUP_ROUTE,
  SIGN_IN_ROUTE: process.env.SIGNIN_ROUTE,
  UPDATE_ROUTE: process.env.UPDATE_ROUTE,
  LOGOUT_ROUTE: process.env.LOGOUT_ROUTE,
  DELETE_ROUTE: process.env.DELETE_ROUTE,
};

// { AUTH_KEY } variables from .env
const AUTH_KEY = {
  SECRET_KEY: process.env.SECRET_KEY,
};

// { COOKIE } variables from .env
const COOKIE = {
  SECRET_NAME: process.env.SECRET_NAME,
};

// { DB_DETAILS } variables from .env
const DB_DETAILS = {
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
};

// Exporting sensitive data from .env file
module.exports = {
  URI,
  ROUTE,
  AUTH_KEY,
  COOKIE,
  DB_DETAILS,
};
