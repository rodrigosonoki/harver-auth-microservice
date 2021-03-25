const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    }  },
  { collection: "users" }
);

module.exports = mongoose.model("User", userSchema);
