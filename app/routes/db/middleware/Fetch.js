// MongoDB schema
const userData = require("../models/UserData");

// Class to fetch data from correponding request
class FetchUserData {
  // Asynchronous function to fetch only { email } in database from user's request
  async fetchUserEmail({ email }) {
    const result = await userData
      .find({
        email: email,
      })
      .then((results) => results)
      .catch((err) => err);
    return result;
  }

  // Asynchronous function to fetch only { email, password } in database from user's request
  async fetchUserEmailAndPassword({ email, password }) {
    const result = await userData
      .find({
        email: email,
        password: password,
      })
      .then((results) => results)
      .catch((err) => err);
    return result;
  }
}

// Class construtor
const fetchUserData = new FetchUserData();
module.exports = fetchUserData;
