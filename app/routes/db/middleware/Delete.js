// MongoDB schema
const userData = require("../models/UserData");

// Asynchronous function to delete corresponding userData from request in database
const deleteUserData = async ({ email }) =>
  await userData
    .findOneAndDelete({
      email: email,
    })
    .then((result) => result)
    .catch((err) => err);

module.exports = deleteUserData;
