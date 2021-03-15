// npm modules
const express = require("express"),
  router = express.Router();

// Database module
const fetchUserData = require("../db/middleware/Fetch");

// Express response Module
const expressResponse = require("./middleware/Response");

// Middleware
const JWT = require("./middleware/JWT"),
  Cookie = require("./middleware/Cookie");

// POST request for "/logout"
router.post("/", async (req, res) => {
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
       * HTTP Status Code: 200 -> OK
       */
      Cookie.destroyCookies(res); // Destroy Cookie which contains the JWT
      expressResponse(res, 200, "logout", verifiedToken);
    } else {
      /*
       * Error Condition
       * If { verifiedToken } contains no string, it means token isn't valid
       * HTTP Status Code: 401 -> Unauthorized
       */
      expressResponse(res, 401, "logout", "TOKEN INCORRECT!");
    }
  } else {
    /*
     * Error Condition
     * If returned { exisitingCookie } doesn't contain any string, then session has expired
     * HTTP Status Code: 404 -> Resource not found
     */
    expressResponse(res, 404, "logout", "SESSION EXPIRED");
  }
});

module.exports = router;
