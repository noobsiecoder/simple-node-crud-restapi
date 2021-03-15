// npm modules
const express = require("express"),
  router = express.Router(),
  { isEmail } = require("validator");

// Database module
const fetchUserObject = require("../db/middleware/Fetch"),
  updateUserPassword = require("../db/middleware/Update");

// Express response Module
const expressResponse = require("./middleware/Response");

// Middleware
const HashPassword = require("./middleware/Hash"),
  JWT = require("./middleware/JWT"),
  Cookie = require("./middleware/Cookie");

// POST request for "/update"
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
      email: req.body.email,
      password: hashedPassword,
    };

    // Fetch { email } of correspoding userData from database
    let mongoResponse = await fetchUserObject.fetchUserByEmail(userData);

    // Handling error
    if (mongoResponse.length === 0) {
      /*
       * Error Function
       * If returned { mongoResponse } array's length is {0} then user doesn't exists
       * HTTP Status Code: 404 -> Resource not found
       */
      expressResponse(res, 404, "update", "USER DOESN'T EXIST!");
    } else {
      /*
       * Success Function
       * If returned { mongoResponse } array's length is more than {0} then user exists
       * Update { password } corresponding to requested { email }
       * HTTP Status Code: 202 -> Accepted
       */
      mongoResponse = await updateUserPassword(userData);
      const issuedToken = JWT.issueToken(mongoResponse._id); // JWT is issued with { _id } being the payload
      Cookie.setCookies(res, issuedToken); // Cookie is set in client side with { isseudToken }
      expressResponse(res, 202, "update", issuedToken);
    }
  } else {
    /*
     * Error Condition
     * If { Email } is not a valid string, then the data cannot be be processed
     * HTTP Status Code: 422 -> Unprocessable entity
     */
    expressResponse(res, 422, "update", "Email ID entered isn't valid");
  }
});

module.exports = router;
