const express = require("express");
const Twowheelervariants = require("../models/twowheelervariants");
const customerComplaintsSchema = require("../models/customerComplaints");
const afterServiceComplaintsSchema = require("../models/afterServiceComplaints");
const mechanicObservationsSchema = require("../models/mechanicObservations");
const partsAndAccessoriesSchema = require("../models/partsAndAccessories");
const standardServicesCheckListSchema = require("../models/standardServicesCheckList");
const servicePaymentsSchema = require("../models/servicePayments");
const serviceDataSchema = require("../models/serviceData");
const checkAuthentication = require("../routers/middlewares/checkAuthentication");
const ServiceData = require("../models/serviceData");
const VehicleData = require("../models/vehicleData");
const customerData = require("../models/customerData");
const { getTenantModel } = require("../database/dbManager");
const { populate } = require("dotenv");
const serviceRouter = express.Router();

//fetch latest served vehicles & customer information
serviceRouter.get(
  "/twogms/feed/servicedvehicles",
  checkAuthentication,
  async (req, res) => {
    let data = [];
    try {
      if (!req.credentialData.tenentId) {
        throw new Error("Please login again!");
      }
      console.log(req.credentialData.tenentId);
      const ServiceData = getTenantModel(
        req.credentialData.tenentId,
        serviceDataSchema,
        "ServiceData"
      );

      let servedVehicleInfos = await ServiceData.find({})
        .populate({
          path: "vehicleDataId",
          populate: {
            path: "customerId",
          },
        })
        .populate({
          path: "vehicleDataId",
          populate: {
            path: "variantId",
          },
        });
      data = servedVehicleInfos?.map((item) => ({
        _id: item._id,
        vehicleNumber: item.vehicleDataId.vehicleNumber,
        vehicleInfo: item.vehicleDataId.variantId,
        customerInfo: item.vehicleDataId.customerId,
        latestservice: item.list.at(-1),
      }));
      data = data.sort(
        (a, b) => b.serviceSequenceNumber - a.serviceSequenceNumber
      );
      res.status(200).json({
        status: "Ok",
        data,
      });
    } catch (err) {
      res.status(401).json({ status: "Failed", message: err.message });
    }
  }
);
//fetch latest servicing vehicles & customer information
serviceRouter.get(
  "/twogms/feed/servicingvehicles",
  checkAuthentication,
  async (req, res) => {
    let data = [];
    try {
      if (!req.credentialData.tenentId) {
        throw new Error("Please login again!");
      }
      console.log(req.credentialData.tenentId);
      const ServiceData = getTenantModel(
        req.credentialData.tenentId,
        serviceDataSchema,
        "ServiceData"
      );

      let servedVehicleInfos = await ServiceData.find({})
        .populate({
          path: "vehicleDataId",
          populate: {
            path: "customerId",
          },
        })
        .populate({
          path: "vehicleDataId",
          populate: {
            path: "variantId",
          },
        });
      for (let i = 0; i < servedVehicleInfos.length; i++) {
        if (
          servedVehicleInfos[i].list[servedVehicleInfos[i].list.length - 1]
            .isLatestService
        ) {
          data.push({
            vehicleNumber: servedVehicleInfos[i].vehicleDataId.vehicleNumber,
            vehicleInfo: servedVehicleInfos[i].vehicleDataId.variantId,
            customerInfo: servedVehicleInfos[i].vehicleDataId.customerId,
            latestService:
              servedVehicleInfos[i].list[servedVehicleInfos[i].list.length - 1],
          });
        }
      }
      data = data.sort(
        (a, b) => b.serviceSequenceNumber - a.serviceSequenceNumber
      );
      res.status(200).json({
        status: "Ok",
        data,
      });
    } catch (err) {
      res.status(401).json({ status: "Failed", message: err.message });
    }
  }
);
//fetch full service details on a given vehicle id from service data
serviceRouter.get(
  "/twogms/feed/getvehicledetails/:vehicleId",
  checkAuthentication,
  async (req, res) => {
    let data = [];
    try {
      const vehicleId = req.params.vehicleId;
      if (!vehicleId) {
        throw new Error("Invalid vehicle information provided!");
      }
      //fetch vehicle information
      const ServiceData = getTenantModel(
        req.credentialData.tenentId,
        serviceDataSchema,
        "ServiceData"
      );
      const isvehicleidvalid = await ServiceData.findOne({
        vehicleDataId: vehicleId,
      });
      if (!isvehicleidvalid) {
        throw new Error("Invalid vehicle information provided!");
      }
      const customerComplaints = getTenantModel(
        req.credentialData.tenentId,
        customerComplaintsSchema,
        "customerComplaints"
      );
      //afterServiceComplaintsId
      const afterServiceComplaints = getTenantModel(
        req.credentialData.tenentId,
        afterServiceComplaintsSchema,
        "afterServiceComplaints"
      );
      //mechanicObservationsId
      const mechanicObservations = getTenantModel(
        req.credentialData.tenentId,
        mechanicObservationsSchema,
        "mechanicObservations"
      );
      //partsAndAccessoriesId
      const partsAndAccessories = getTenantModel(
        req.credentialData.tenentId,
        partsAndAccessoriesSchema,
        "partsAndAccessories"
      );
      //StandardServicesCheckListId
      const standardServicesCheckList = getTenantModel(
        req.credentialData.tenentId,
        standardServicesCheckListSchema,
        "standardServicesCheckList"
      );
      //servicePaymentsId
      const servicePayments = getTenantModel(
        req.credentialData.tenentId,
        servicePaymentsSchema,
        "servicePayments"
      );
      let allinfo = await ServiceData.findOne({ vehicleDataId: vehicleId })
        .populate({
          path: "vehicleDataId",
          populate: {
            path: "customerId",
          },
        })
        .populate({
          path: "vehicleDataId",
          populate: {
            path: "variantId",
          },
        });
      //do it manual
      const data = await Promise.all(
        allinfo?.list.map(async (service) => {
          const customerComplaintsinfo = await customerComplaints.findById(
            service.customerComplaintsId
          );
          const afterServiceComplaintsinfo =
            await afterServiceComplaints.findById(
              service.afterServiceComplaintsId
            );
          const mechanicObservationsIdinfo =
            await mechanicObservations.findById(service.mechanicObservationsId);
          //
          const servicePaymentsIdinfo = await servicePayments.findById(
            service.servicePaymentsId
          );
          const StandardServicesCheckListIdinfo =
            await standardServicesCheckList.findById(
              service.StandardServicesCheckListId
            );
          const partsAndAccessoriesIdinfo = await partsAndAccessories.findById(
            service.partsAndAccessoriesId
          );
          return {
            service,
            customerComplaintsinfo,
            afterServiceComplaintsinfo,
            mechanicObservationsIdinfo,
            partsAndAccessoriesIdinfo,
            StandardServicesCheckListIdinfo,
            servicePaymentsIdinfo,
          };
        })
      );
      const resultdata = {
        vehicleAndCustomer: allinfo.vehicleDataId,
        servicelist: data,
      };
      res.status(200).json({
        status: "Ok",
        resultdata,
      });
    } catch (err) {
      res.status(401).json({ status: "Failed", message: err.message });
    }
  }
);
//post new vehicle to respective garage
serviceRouter.post(
  "/twogms/addnewvehicle",
  checkAuthentication,
  async (req, res) => {
    try {
      const {
        vehicleNumber,
        variantId,
        customerName,
        primaryMobileNumber,
        preferredMobileNumber,
        address,
        email,
      } = req.body;
      if (
        !vehicleNumber ||
        !variantId ||
        !customerName ||
        !primaryMobileNumber
      ) {
        throw new Error("Information is not valid!");
      }
    } catch (err) {
      res.status(403).json({ status: "Failed", message: err.message });
    }
  }
);
module.exports = serviceRouter;
