const mongoose = require("mongoose");
const serviceDataSchema = mongoose.Schema(
  {
    vehicleDataId: {
      type: String,
      ref: "VehicleData",
      required: true,
    },
    list: {
      type: [
        {
          kmDriven: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
            max: 9999999,
          },
          dateOfVehicleEntry: {
            type: Date,
            required: true,
            default: new Date(),
          },
          dateOfVehicleExit: {
            type: Date,
            required: true,
            default: new Date(),
          },
          kmForNextService: {
            type: Number,
            default: 0,
            min: 0,
            max: 9999999,
          },
          dateForNextService: {
            type: Date,
          },
          serviceSequenceNumber: {
            type: Number,
            min: 1,
            max: 9999999,
          },
          serviceBill: {
            type: Number,
            min: 0,
            max: 9999999,
            default: 0,
          },
          cashPay: {
            type: Number,
            min: 0,
            max: 9999999,
            default: 0,
          },
          onlinePay: {
            type: Number,
            min: 0,
            max: 9999999,
            default: 0,
          },
          serviceSequenceIndex: {
            type: Number,
            min: 0,
            max: 9999999,
          },
          serviceStatus: {
            type: Number,
            min: -1,
            max: 2,
            default: 0,
          },
          isLatestService: {
            type: Boolean,
            default: false,
          },
          fuelPercentBeforeService: {
            type: Number,
            min: 0,
            max: 100,
          },
          afterServiceComplaintsId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "afterServiceComplaints",
          },
          customerComplaintsId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "customerComplaintsSchema",
          },
          mechanicObservationsId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "mechanicObservations",
          },
          partsAndAccessoriesId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "partsAndAccessories",
          },
          servicePaymentsId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "servicePayments",
          },
          StandardServicesCheckListId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "StandardServicesCheckList",
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = serviceDataSchema;
