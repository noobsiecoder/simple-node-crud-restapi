// npm modules
const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

// MongoDB Schema
const UserDataSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Creating MongoDB Data model
const UserData = mongoose.model("userData", UserDataSchema);
module.exports = UserData;
