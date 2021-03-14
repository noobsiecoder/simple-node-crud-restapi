// npm modules
const express = require("express"),
  morgan = require("morgan"),
  app = express();

// Custom modules
const CONFIG = require("../config/config");

// API modules
const signUpUser = require("./api/signup"),
  signInUser = require("./api/signin"),
  forgotPassword = require("./api/forgotpassword"),
  logoutUser = require("./api/logout"),
  deleteUser = require("./api/delete");

app.use(morgan("dev"));
app.use(express.json());

// REST API middlewares
app
  .use(CONFIG.SIGN_UP_ROUTE, signUpUser)
  .use(CONFIG.SIGN_IN_ROUTE, signInUser)
  .use(CONFIG.UPDATE_ROUTE, forgotPassword)
  .use(CONFIG.LOGOUT_ROUTE, logoutUser)
  .use(CONFIG.DELETE_ROUTE, deleteUser);

// Error handling - Handles 404 and 500 error
app
  .use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
  })
  .use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      message: error.message,
    });
  });

module.exports = app;
