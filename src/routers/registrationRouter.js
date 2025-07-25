const express = require("express");
const argon2 = require("argon2");
const validator = require("validator");
const getGarageId = require("../utils/getGarageId");
const registration = require("../models/registration");
const registrationRouter = express.Router();
registrationRouter.post("/twogms/register", async (req, res) => {
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
module.exports = registrationRouter;
