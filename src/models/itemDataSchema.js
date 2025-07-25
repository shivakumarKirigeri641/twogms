const mongoose = require("mongoose");
const itemDataSchema = mongoose.Schema(
  {
    title: {
      type: String,
      minLength: 2,
      maxLength: 50,
    },
    description: {
      type: String,
      minLength: 2,
      maxLength: 300,
    },
    isAmountPayable: {
      type: Boolean,
      default: true,
    },
    amountPaymentStatus: {
      type: Boolean,
      default: false,
    },
    isChecked: {
      type: Boolean,
      default: false,
    },
    amount: {
      type: Number,
      default: 0,
      min: 0,
      max: 10000,
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1,
      max: 100,
    },
    cGST: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    sGST: {
      type: Number,
      default: 0,
      min: 0,
      max: 10000,
    },
    comments: {
      type: String,
      default: "",
    },
    resolution: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = itemDataSchema;
