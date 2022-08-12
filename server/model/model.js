const mongoose = require("mongoose");

let schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    uniquer: true,
  },
  gender: String,
  status: String,
});

const UserDb = mongoose.model("userDB", schema);

module.exports = UserDb;
