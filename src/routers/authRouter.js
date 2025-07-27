const express = require("express");
const authRouter = express.Router();
const registration = require("../models/registration");
const createJsonToken = require("../utils/createJsonToken");
const validateLogin = require("../utils/validateLogin");
const checkAuthentication = require("./middlewares/checkAuthentication");
module.exports = authRouter;
//register
authRouter.post("/twogms/register", async (req, res) => {
  try {
    const resultreg = await registration.find({});
    let id = 1;
    if (resultreg) {
      id = resultreg.length + 1;
    }
    console.log(id);
    const result = new registration({
      garageName: req.body.garageName,
      ownerName: req.body.ownerName,
      phoneNumber: req.body.phoneNumber,
      tenentId: id,
      password: await argon2.hash(req.body.password),
    });
    await result.save();
    res.status(200).json({ status: "Ok", message: "registration successful" });
  } catch (err) {
    res.status(403).json({
      status: "faild",
      message: "registration unsuccessful",
      error: err.message,
    });
  }
});
//login
authRouter.post("/twogms/login", async (req, res) => {
  try {
    await validateLogin(req);
    const token = await createJsonToken(req);
    res.cookie("token", token);
    res.status(200).json({ status: "Okhh", message: req.credentialData });
  } catch (err) {
    res.status(401).json({ status: "Failed", message: err.message });
  }
});
//login
authRouter.post("/twogms/logout", checkAuthentication, async (req, res) => {
  try {
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.status(200).json({ status: "Ok" });
  } catch (err) {
    res.status(401).json({ status: "Failed", message: err.message });
  }
});
