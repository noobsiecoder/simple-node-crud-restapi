// npm modules
const express = require("express"),
  router = express.Router();

// Database module
const fetchUserObject = require("../db/middleware/Fetch"),
  deleteUserData = require("../db/middleware/Delete");

// Express response Module
const expressResponse = require("./middleware/Response");

// Middleware
const JWT = require("./middleware/JWT"),
  Cookie = require("./middleware/Cookie");

// DELETE request for "/delete"
router.delete("/", async (req, res) => {
  // Check if cookie exists in client side
  const existingCookie = Cookie.getCookies(req);

  // Handling error
  if (existingCookie) {
    /*
     * Success Function
     * If { existingCookie } contains string, then it exists in client side
     */
    const verifiedToken = JWT.verifyToken(existingCookie); // Verify JWT recieved from client
    if (verifiedToken) {
      /*
       * Success Condition
       * If { verifiedToken } contains string, it means token is valid
       * HTTP Status Code: 202 -> Accepted
       */
      // Fetch { email, password } of correspoding userData from database
      let mongoResponse = await fetchUserObject.fetchUserById(verifiedToken); // Fetching user data from database
      Cookie.destroyCookies(res); // Destroy Cookie which contains the JWT
      mongoResponse = await deleteUserData(mongoResponse[0]); // Delete user data
      expressResponse(res, 202, "delete", mongoResponse);
    } else {
      /*
       * Error Condition
       * If returned { exisitingCookie } doesn't contain any string, then session has expired
       * HTTP Status Code: 404 -> Resource not found
       */
      expressResponse(res, 401, "delete", "TOKEN INCORRECT!");
    }
  }
});

module.exports = router;
