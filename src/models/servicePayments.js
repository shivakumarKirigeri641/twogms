const { default: mongoose } = require("mongoose");
const itemDataSchema = require("./itemDataSchema");
const servicePaymentsSchema = mongoose.Schema(
  {
    amountPaid: {
      type: Number,
      required: true,
      default: 0,
    },
    dueAmount: {
      type: Number,
      default: 0,
    },
    cashPay: {
      type: Number,
      default: 0,
    },
    onlinePay: {
      type: Number,
      default: 0,
    },
    list: {
      type: [itemDataSchema],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = servicePaymentsSchema;
