const express = require("express");
const checkAuthentication = require("./middlewares/checkAuthentication");
const { getTenantModel } = require("../database/dbManager");
const serviceRouter = express.Router();
serviceRouter.get(
  "/twogms/servicedvehicles",
  checkAuthentication,
  async (req, res) => {
    try {
      /*const vehicleDataModel = getTenantModel(
        req.credentialData.tenentId,
        vehicleDataSchema,
        "VehicleData"
      );*/
      res.status(200).json({ status: "Ok" });
    } catch (err) {
      res.status(401).json({ status: "Failed", message: err.message });
    }
  }
);
module.exports = serviceRouter;
