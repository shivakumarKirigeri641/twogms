const jwt = require("jsonwebtoken");
require("dotenv").config();
const createJsonToken = async (req) => {
  const token = await jwt.sign(
    { _id: req.credentialData._id },
    process.env.SECRET_KEY,
    { expiresIn: "1d" }
  );
  return token;
};
module.exports = createJsonToken;
