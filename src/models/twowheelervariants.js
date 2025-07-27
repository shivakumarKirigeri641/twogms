const mongoose = require("mongoose");
const twowheelerVariantsSchema = mongoose.Schema({
  variantName: {
    type: String,
    required: true,
    minLength: 3,
  },
  photourl: {
    type: String,
  },
  modelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "twowheelerModels",
    required: true,
  },
});
const Twowheelervariants = mongoose.model(
  "Twowheelervariants",
  twowheelerVariantsSchema
);
module.exports = Twowheelervariants;
