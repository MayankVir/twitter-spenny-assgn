const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tweets: [
    {
      tweet: {
        type: String,
        required: true,
      },
      createdAt: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
    },
  ],
  following: [
    {
      username: {
        type: String,
        required: true,
      },
    },
  ],
});

const UserModel = mongoose.model("UserModel", userSchema);

module.exports = UserModel;
