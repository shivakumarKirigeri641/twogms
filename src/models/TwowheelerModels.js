const mongoose = require("mongoose");
const twowheelerModelsSchema = mongoose.Schema({
  modelName: {
    type: String,
    required: true,
    minLength: 3,
  },
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TwowheelerBrands",
    required: true,
  },
});
const TwowheelerModels = mongoose.model(
  "twowheelerModels",
  twowheelerModelsSchema
);
module.exports = TwowheelerModels;
