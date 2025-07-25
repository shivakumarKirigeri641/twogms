const express = require("express");
const argon2 = require("argon2");
const validator = require("validator");
const getGarageId = require("../utils/getGarageId");
const gms_registration_model = require("../models/gms_registration_model");
const registrationRouter = express.Router();
registrationRouter.post("/twogms/register", async (req, res) => {
  try {
    const result = new gms_registration_model({
      garageName: req.body.garageName,
      ownerName: req.body.ownerName,
      phoneNumber: req.body.phoneNumber,
      garageId: "ssmotors",
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
