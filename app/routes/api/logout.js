// npm modules
const express = require("express"),
  router = express.Router();

// Database module
const fetchUserData = require("../db/middleware/Fetch"),
  updateUserSession = require("../db/middleware/Update");

// Express response Module
const expressResponse = require("./middleware/response");

// POST request for "/logout"
router.post("/", async (req, res) => {
  const userData = {
    email: req.body.email,
    password: req.body.password,
    session: false,
  };
  // Fetch { email, password } of correspoding userData from database
  let mongoResponse = await fetchUserData.fetchUserEmailAndPassword(userData);

  // Handling error
  if (mongoResponse.length === 0) {
    /*
     * Error Function
     * If returned { mongoResponse } array's length is {0} then user doesn't exists
     * HTTP Status Code: 404 -> Resource not found
     */
    expressResponse(res, 404, "logout", "USER DOESN'T EXIST!");
  } else if (!mongoResponse[0].session) {
    /*
     * Error Function
     * If returned { mongoResponse } session is { false } then user has already logged out
     * HTTP Status Code: 403 -> Forbidden
     */
    expressResponse(res, 403, "logout", "FORBIDDEN FROM LOGGING OUT!");
  } else {
    /*
     * Success Function
     * If returned { mongoResponse } array's length is more than {0} and session is { true } then user exists and is logged in
     * Update user's { session } to { false }
     * HTTP Status Code: 200 -> OK
     */
    mongoResponse = await updateUserSession.updateSession(userData);
    expressResponse(res, 200, "logout", mongoResponse);
  }
});

module.exports = router;
