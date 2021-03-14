// npm modules
const express = require("express"),
  router = express.Router(),
  uuid = require("uuid");

// Database module
const createNewUserData = require("../db/middleware/Add");

// Express response Module
const expressResponse = require("./middleware/response");

// POST request for "/signup"
router.post("/", async (req, res) => {
  const userData = {
    uuid: uuid.v4(),
    email: req.body.email,
    password: req.body.password,
    session: true,
  };
  // Create new userData in database
  const mongoResponse = await createNewUserData(userData);

  // Handling error
  if (mongoResponse.name === "MongoError") {
    /*
     * Error Function
     * If any error occurs while carrying an operation in MongoDB, Error is returned as "MongoError"
     * HTTP Status Code: 409 -> Conflict
     */
    expressResponse(res, 409, "signup", "USER ALREADY EXISTS!");
  } else {
    /*
     * Success Function
     * If no error occurs while carrying an operation in MongoDB, Data is added successfully
     * HTTP Status Code: 201 -> Created
     */
    expressResponse(res, 201, "signup", mongoResponse);
  }
});

module.exports = router;
