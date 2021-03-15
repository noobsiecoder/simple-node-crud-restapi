// MongoDB schema
const userData = require("../models/UserData");

// Asynchronous function to update { password } in database from user's request
const updatePassword = async ({ email, password }) => {
  const result = await userData
    .findOneAndUpdate(
      {
        email: email,
      },
      { password: password }
    )
    .then((results) => results)
    .catch((err) => err);
  return result;
};

module.exports = updatePassword;
