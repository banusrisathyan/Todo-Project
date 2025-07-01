const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: String,
  email: String,
  name: String,
});

const UserSchema = new mongoose.Schema({
  googleId: String,
  githubId: String,
  name: String,
  email: String,
});

module.exports = mongoose.model("User", UserSchema);
