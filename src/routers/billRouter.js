const express = require("express");
const VehicleData = require("../models/vehicleData");
const billRouter = express.Router();
billRouter.get(
  "/admin/edit/getbilldetails/:vehiclenumber/:servicedateindex",
  async (req, res) => {
    try {
      const vehiclenumber = req.params.vehiclenumber;
      const servicedateindex = req.params.servicedateindex;
      console.log(vehiclenumber, servicedateindex);
      //check if vehicle exists in db
      const vehicle = await VehicleData.findOne({
        vehicleNumber: vehiclenumber,
      })
        .populate({
          path: "variantId",
          select: "variantName",
        })
        .populate("customerId")
        .populate({
          path: "serviceDataId",
          populate: {
            path: "list.customerComplaintsId",
            select: "_id list",
          },
        })
        .populate({
          path: "serviceDataId",
          populate: {
            path: "list.mechanicObservationsId",
            select: "_id list",
          },
        })
        .populate({
          path: "serviceDataId",
          populate: {
            path: "list.afterServiceComplaintsId",
            select: "_id list",
          },
        })
        .populate({
          path: "serviceDataId",
          populate: {
            path: "list.partsAndAccessoriesId",
            select: "_id list",
          },
        })
        .populate({
          path: "serviceDataId",
          populate: {
            path: "list.StandardServicesCheckListId",
            select: "_id list",
          },
        })
        .populate({
          path: "serviceDataId",
          populate: {
            path: "list.servicePaymentsId",
            select: "_id list",
          },
        });
      if (!vehicle) {
        throw new Error("Vehicle not found!");
      }
      //check if servicedateindex is valid
      if (
        0 > servicedateindex ||
        servicedateindex > vehicle?.serviceDataId?.list?.length - 1
      ) {
        throw new Error("Invalid service date provided!");
      }
      const servicecontent = vehicle?.serviceDataId?.list[servicedateindex];

      res.status(200).json({ status: "Ok", servicecontent });
    } catch (err) {
      res.status(403).json({ status: "Failed", message: err.message });
    }
  }
);
module.exports = billRouter;
