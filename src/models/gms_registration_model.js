const mongoose = require("mongoose");
const gms_registration_modelSchema = mongoose.Schema({
  garageName: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 50,
  },
  ownerName: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 100,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    minLength: 10,
    maxLength: 10,
  },
  logoPath: {
    type: String,
    default: "",
  },
  tagLine: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  garageId: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    default: "",
  },
});
const gms_registration_model = mongoose.model(
  "gms_registration_model",
  gms_registration_modelSchema
);
module.exports = gms_registration_model;
