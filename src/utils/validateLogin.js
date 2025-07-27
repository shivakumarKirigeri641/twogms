const registration = require("../models/registration");
const argon2 = require("argon2");
const validateLogin = async (req) => {
  try {
    const { phoneNumber, password } = req.body;
    const result = await registration.findOne({ phoneNumber });
    if (!result) {
      throw new Error("Invalid credentials!");
    }
    const isvalidpassword = await argon2.verify(result.password, password);
    if (!isvalidpassword) {
      throw new Error("Invalid credentials!!");
    }
    req.credentialData = result;
  } catch (err) {
    throw new Error(err);
  }
};
module.exports = validateLogin;
