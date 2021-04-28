const express = require("express");
const cors = require("cors");
require("dotenv/config");

import routes from "./routes/";

const app = express();

app.use(express.json());
app.use(cors());
app.options("*", cors());

app.use("/api/v1/auth", routes);

app.listen(process.env.PORT, () =>
  console.log(
    `Auth API is running on port ${process.env.PORT} on ${process.env.ENV} environment.`
  )
);
