const { default: mongoose } = require("mongoose");
const itemDataSchema = require("./itemDataSchema");
const servicePaymentsSchema = mongoose.Schema(
  {
    totalBillGenerated: {
      type: Number,
      required: true,
      default: 0,
    },
    payStatus: {
      type: Number,
      required: true,
      default: -1,
    },
    list: {
      type: [
        {
          amountPaid: {
            type: Number,
            required: true,
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
        },
        {
          timestamps: true,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = servicePaymentsSchema;
