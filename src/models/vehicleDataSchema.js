const mongoose = require("mongoose");
const vehicleDataSchema = mongoose.Schema(
  {
    vehicleNumber: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 15,
      validate(value) {
        if (value.length < 8 || value.length > 15) {
          throw new Error("Vehicle number is invalid!");
        }
      },
    },
    variantId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Twowheelervariants",
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "CustomerData",
    },
    serviceDataId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "ServiceData",
    },
    isElectric: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
vehicleDataSchema.index({ vehicleNumber: 1 });
module.exports = vehicleDataSchema;
