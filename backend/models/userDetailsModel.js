const mongoose = require("mongoose");
require("dotenv").config();
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    favProducs: {
      type: Array,
      required: true,
    },
  },
  {
    collection: "userDetails",
    timestamps: true,
  }
);

const userDetail = mongoose.model("userDetail", userSchema, "userDetails");
module.exports = userDetail;
