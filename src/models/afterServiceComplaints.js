const mongoose = require("mongoose");
const itemDataSchema = require("./itemDataSchema");
const afterServiceComplaintsSchema = mongoose.Schema(
  {
    list: {
      type: [itemDataSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = afterServiceComplaintsSchema;
