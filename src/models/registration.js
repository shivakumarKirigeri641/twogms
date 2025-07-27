const mongoose = require("mongoose");
const registrationSchema = mongoose.Schema({
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
  tenentId: {
    type: Number,
    unique: true,
  },
  password: {
    type: String,
    default: "",
  },
});
const registration = mongoose.model("registration", registrationSchema);
module.exports = registration;
