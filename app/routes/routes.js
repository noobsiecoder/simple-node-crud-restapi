// npm modules
const express = require("express"),
  morgan = require("morgan"),
  cookieParser = require("cookie-parser"),
  cors = require("cors"),
  app = express();

// Custom modules
const { ROUTE } = require("../config/config");

// API modules
const signUpUser = require("./api/signup"),
  signInUser = require("./api/signin"),
  forgotPassword = require("./api/forgotpassword"),
  logoutUser = require("./api/logout"),
  deleteUser = require("./api/delete");

// Express response Module
const expressResponse = require("./api/middleware/Response");

// Using NPM middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// REST API middlewares
app
  .use(ROUTE.SIGN_UP_ROUTE, signUpUser)
  .use(ROUTE.SIGN_IN_ROUTE, signInUser)
  .use(ROUTE.UPDATE_ROUTE, forgotPassword)
  .use(ROUTE.LOGOUT_ROUTE, logoutUser)
  .use(ROUTE.DELETE_ROUTE, deleteUser);

// Error handling - Handles 404 and 500 error
app
  .use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
  })
  .use((error, req, res, next) => {
    // Handling respective error
    expressResponse(
      res,
      error.status || 500,
      req.path.replace("/", ""),
      error.message
    );
  });

module.exports = app;
