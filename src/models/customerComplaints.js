const { default: mongoose } = require("mongoose");
const itemDataSchema = require("./itemDataSchema");
const customerComplaintsSchema = mongoose.Schema(
  {
    list: {
      type: [itemDataSchema],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = customerComplaintsSchema;
