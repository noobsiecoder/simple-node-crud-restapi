// npm modules
const express = require("express"),
  router = express.Router();

// Database module
const fetchUserData = require("../db/middleware/Fetch"),
  deleteUserData = require("../db/middleware/Delete");

// Express response Module
const expressResponse = require("./middleware/response");

// DELETE request for "/delete"
router.delete("/", async (req, res) => {
  const userData = {
    email: req.body.email,
    password: req.body.password,
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
    expressResponse(res, 404, "delete", "USER DOESN'T EXIST!");
  } else if (mongoResponse[0].session === false) {
    /*
     * Error Function
     * If returned { mongoResponse } session is { false } then user has already logged out
     * HTTP Status Code: 403 -> Forbidden
     */
    expressResponse(res, 403, "delete", "FORBIDDEN FROM DELETING DATA!");
  } else {
    /*
     * Success Function
     * If returned { mongoResponse } array's length is more than {0} and { session } is { true } then user exists and is logged in
     * Delete Data
     * HTTP Status Code: 202 -> Accepted
     */
    mongoResponse = await deleteUserData(userData);
    expressResponse(res, 202, "delete", mongoResponse);
  }
});

module.exports = router;
