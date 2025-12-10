const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  access_token: String,
  refresh_token: String,
});

module.exports = mongoose.model("Token", tokenSchema);
