import db from "../database/db";

const userSchema = new db.Schema(
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
    },
  },
  { collection: "users" }
);

module.exports = db.model("User", userSchema);
