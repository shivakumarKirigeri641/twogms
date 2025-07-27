const express = require("express");
const checkAuthentication = require("../routers/checkAuthentication");
const ServiceData = require("../models/serviceData");
const VehicleData = require("../models/vehicleData");
const CustomerData = require("../models/customerData");
const mongoose = require("mongoose");
const TwowheelerBrands = require("../models/TwowheelerBrands");
const twowheelerModels = require("../models/TwowheelerModels");
const TwoWheelerVariants = require("../models/twowheelervariants");
const summaryRouter = express.Router();

//fetch service summary
summaryRouter.get(
  "/admin/feed/getservicesummary",
  checkAuthentication,
  async (req, res) => {
    try {
      const servicescount = await ServiceData.collection.countDocuments();
      const vehicleservicedcount =
        await VehicleData.collection.countDocuments();

      const totalearnings = await PaidInformation.find({});
      let sum = 0;
      totalearnings.forEach((element) => {
        sum = sum + element.onlinePay;
      });
      res.status(200).json({
        status: "Ok",
        data: {
          servicesCount: servicescount,
          vehiclesServed: vehicleservicedcount,
          overallearnings: sum,
        },
      });
    } catch (err) {
      res.status(401).json({ status: "Failed", message: err.message });
    }
  }
);
module.exports = summaryRouter;
