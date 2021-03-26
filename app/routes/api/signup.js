// npm modules
const express = require("express"),
  router = express.Router(),
  { isEmail } = require("validator");

// Database module
const createNewUserData = require("../db/middleware/Add");

// Express response Module
const expressResponse = require("./middleware/Response");

// Middleware
const HashPassword = require("./middleware/Hash"),
  JWT = require("./middleware/JWT"),
  Cookie = require("./middleware/Cookie");

// POST request for "/signup"
router.post("/", async (req, res) => {
  if (isEmail(req.body.email)) {
    /*
     * Success Condition
     * If { Email } is a valid string, then the data can be processed
     */
    // Hashing password and retrieving it by resolving "Promise"
    const hashedPassword = await HashPassword.hashPassword(
      req.body.password
    ).then((res) => res);

    // Object containing requested data from client with { password } being hashed
    const userData = {
      username: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    };

    // Create new userData in database
    const mongoResponse = await createNewUserData(userData);

    // Handling error
    if (mongoResponse.name === "MongoError") {
      /*
       * Error Condition
       * If any error occurs while carrying an operation in MongoDB, Error is returned as "MongoError"
       * HTTP Status Code: 409 -> Conflict
       */
      expressResponse(res, 409, "signup", "USER ALREADY EXISTS!");
    } else {
      /*
       * Success Condition
       * If no error occurs while carrying an operation in MongoDB, Data is added successfully
       * HTTP Status Code: 201 -> Created
       */
      const issuedToken = JWT.issueToken(mongoResponse); // JWT is issued with { _id } being the payload
      Cookie.setCookies(res, issuedToken); // Cookie is set in client side with { isseudToken }
      expressResponse(res, 201, "signup", issuedToken);
    }
  } else {
    /*
     * Error Condition
     * If { Email } is not a valid string, then the data cannot be be processed
     * HTTP Status Code: 422 -> Unprocessable entity
     */
    expressResponse(res, 422, "signup", "Email ID entered isn't valid");
  }
});

module.exports = router;
