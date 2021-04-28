import db from "../database/db";

const userSchema = new db.Schema(
  {
    name: {
      type: String,
      min: 6,
      max: 255,
    },
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
    passwordResetToken: {
      type: String,
      select: false,
    },
    passwordResetExpires: {
      type: Date,
      select: false,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    avatar: {
      type: String,
      default: "https://api.adorable.io/avatars/40/abott@adorable.png",
    },
    isVerified: {
      type: Boolean,
      default: 0,
    },
    verificationToken: {
      type: String,
      select: false,
    },
  },
  { collection: "users" }
);

module.exports = db.model("User", userSchema);
