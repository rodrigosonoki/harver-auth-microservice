import jwt from "jsonwebtoken";
require("dotenv/config");

export default function makeGenerateJwt(user) {
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.SECRET_TOKEN
  );

  return token;
}
