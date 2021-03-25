const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose')

import makeLogin from "./controllers/login";
import register from "./controllers/register"

require("dotenv/config");

const app = express();

mongoose.connect(
  "mongodb+srv://rodrigosonoki:1234@auth.yjsqx.mongodb.net/harver-stg?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Mongoose Is Connected");
  }
);


app.use(express.json());

app.use(cors());
app.options("*", cors());


// Routes
app.post("/register", register);
app.post('/login', makeLogin)




app.listen(process.env.PORT, () =>
  console.log(`Auth API is running on port ${process.env.PORT}...`)
);
