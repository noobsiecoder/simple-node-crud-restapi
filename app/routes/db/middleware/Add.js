// MongoDB schema
const userData = require("../models/UserData");

// Asynchronous function to create new userData in database
const createNewUserData = async ({ uuid, email, password, session }) => {
  const data = new userData({
    uuid: uuid,
    email: email,
    password: password,
    session: session,
  });
  const saveData = await data
    .save()
    .then((result) => result)
    .catch((err) => err);
  return saveData;
};

module.exports = createNewUserData;
