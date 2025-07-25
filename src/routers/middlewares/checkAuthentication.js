const jwt = require("jsonwebtoken");
const registration = require("../../models/registration");
require("dotenv").config();
const checkAuthentication = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Session (token) not found!");
    }
    const result = await jwt.verify(token, process.env.SECRET_KEY);
    if (!result) {
      throw new Error("Session expiredddd!");
    }
    const admindata = await registration.findById(result._id);
    if (admindata._id.toString() !== result._id.toString()) {
      throw new Error("Invalid session. Please re-login!");
    }
    req.credentialData = admindata;
    next();
  } catch (err) {
    res.status(401).json({
      status: "Faidddled",
      message: err.message,
    });
  }
};
module.exports = checkAuthentication;
