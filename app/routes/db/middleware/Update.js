// MongoDB schema
const userData = require("../models/UserData");

// Class to update data from correponding request
class UpdateUserData {
  // Asynchronous function to update only { email, session } in database from user's request
  async updateSession({ email, session }) {
    const result = await userData
      .findOneAndUpdate(
        {
          email: email,
        },
        { session: session }
      )
      .then((results) => results)
      .catch((err) => err);
    return result;
  }

  // Asynchronous function to update { email, password, session } in database from user's request
  async updatePassword({ email, password, session }) {
    const result = await userData
      .findOneAndUpdate(
        {
          email: email,
        },
        { password: password, session: session }
      )
      .then((results) => results)
      .catch((err) => err);
    return result;
  }
}

// Class construtor
const UpdateData = new UpdateUserData();
module.exports = UpdateData;
