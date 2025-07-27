const mongoose = require("mongoose");
const itemDataSchema = require("./itemDataSchema");
const partsAndAccessoriesSchema = mongoose.Schema(
  {
    list: {
      type: [itemDataSchema],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = partsAndAccessoriesSchema;
