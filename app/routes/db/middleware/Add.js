// MongoDB schema
const userData = require("../models/UserData");

// Asynchronous function to create new userData in database
const createNewUserData = async ({ email, password }) => {
  const data = new userData({
    email: email,
    password: password,
  });
  const saveData = await data
    .save()
    .then((result) => result)
    .catch((err) => err);
  return saveData;
};

module.exports = createNewUserData;
