// npm modules
const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

// MongoDB Schema
const UserDataSchema = new Schema(
  {
    uuid: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    session: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

// Creating MongoDB Data model
const UserData = mongoose.model("userData", UserDataSchema);
module.exports = UserData;
