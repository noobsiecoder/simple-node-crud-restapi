// npm modules
const express = require("express"),
  router = express.Router(),
  { isEmail } = require("validator");

// Database module
const fetchUserObject = require("../db/middleware/Fetch");

// Express response Module
const expressResponse = require("./middleware/Response");

// Middleware
const HashPassword = require("./middleware/Hash"),
  JWT = require("./middleware/JWT"),
  Cookie = require("./middleware/Cookie");

// POST request for "/signin"
router.post("/", async (req, res) => {
  if (isEmail(req.body.email)) {
    /*
     * Success Condition
     * If { Email } is a valid string, then the data can be processed
     */
    // Object containing requested data from client
    const userData = {
      email: req.body.email,
      password: req.body.password,
    };
    // Fetch { email, password } of correspoding userData from database
    let mongoResponse = await fetchUserObject.fetchUserByEmail(userData);
    let comparePassword; // Boolean variable to compare two passwords respectively

    // Comparing user requested password with existing password in the database
    if (mongoResponse.length !== 0) {
      // Hashing requested password and comparing with existing password and then retrieving it by resolving "Promise"
      comparePassword = await HashPassword.comparePassword(
        userData.password,
        mongoResponse[0].password
      ).then((res) => res);
    }

    // Handling error
    if (mongoResponse.length === 0) {
      /*
       * Error Function
       * If returned { mongoResponse } array's length is {0} then user doesn't exists
       * HTTP Status Code: 404 -> Resource not found
       */
      expressResponse(res, 404, "signin", "USER DOESN'T EXIST!");
    } else if (!comparePassword) {
      /*
       * Error Function
       * If { comparePassword } is { false }, then we don't allow to signin
       * HTTP Status Code: 403 -> Forbidden
       */
      expressResponse(res, 403, "signin", "FORBIDDEN FROM ENTERING!");
    } else {
      /*
       * Success Function
       * If returned { mongoResponse } array's length is more than {0} and { comparePassword } is { true }, then user exists and hasn't signed yet
       * HTTP Status Code: 200 -> OK
       */
      const issuedToken = JWT.issueToken(mongoResponse[0]._id); // JWT is issued with { _id } being the payload
      Cookie.setCookies(res, issuedToken); // Cookie is set in client side with { isseudToken }
      expressResponse(res, 200, "signin", issuedToken);
    }
  } else {
    /*
     * Error Condition
     * If { Email } is not a valid string, then the data cannot be be processed
     * HTTP Status Code: 422 -> Unprocessable entity
     */
    expressResponse(res, 422, "signin", "Email ID entered isn't valid");
  }
});

module.exports = router;
