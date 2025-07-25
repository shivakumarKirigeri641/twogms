const mongoose = require("mongoose");
const validator = require("validator");
const customerDataSchema = mongoose.Schema(
  {
    customerName: {
      type: String,
      minLength: 3,
      maxLength: 50,
    },
    primaryMobileNumber: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 10,
      validate(value) {
        for (let char of value) {
          if (isNaN(char)) {
            throw new Error("Invalid mobile number!");
          }
        }
      },
    },
    preferredMobileNumber: {
      type: String,
      minLength: 10,
      maxLength: 10,
      validate(value) {
        for (let char of value) {
          if (isNaN(char)) {
            throw new Error("Invalid mobile number!");
          }
        }
      },
    },
    address: {
      type: String,
      minLength: 0,
      maxLength: 100,
    },
    email: {
      type: String,
      validate(value) {
        if (!value) return;
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email provided!");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);
customerDataSchema.index({ customerName: 1 });
const CustomerData = mongoose.model("CustomerData", customerDataSchema);
module.exports = CustomerData;
