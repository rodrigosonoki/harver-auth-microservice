const express = require("express");
const cors = require("cors");
require("dotenv/config");

import authRoutes from "./routes/authRoutes";

const app = express();

app.use(express.json());
app.use(cors());
app.options("*", cors());

app.use("/api/v1/auth", authRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Auth API is running on port ${process.env.PORT}...`)
);
