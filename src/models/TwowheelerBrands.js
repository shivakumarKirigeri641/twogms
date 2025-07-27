const mongoose = require("mongoose");
const validator = require("validator");
const twoWheelerBrandsSchema = mongoose.Schema({
  brandName: {
    type: String,
    unique: true,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  logourl: {
    type: String,
    default:
      "https://e7.pngegg.com/pngimages/873/949/png-clipart-bicycle-orbea-mountain-bike-cycling-29er-cyclist-logo-white-text-thumbnail.png",
  },
});
const TwowheelerBrands = mongoose.model(
  "TwowheelerBrands",
  twoWheelerBrandsSchema
);
module.exports = TwowheelerBrands;
