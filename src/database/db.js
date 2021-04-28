import mongoose from "mongoose";
require("dotenv/config");

mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Database is connected");
  }
);

mongoose.Promise = global.Promise;

module.exports = mongoose;
