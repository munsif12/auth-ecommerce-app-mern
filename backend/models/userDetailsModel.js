const mongoose = require("mongoose");
require("dotenv").config();
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "User Name field is required"],
    },
    phone: {
      type: Number,
      required: [true, "User Phone No. field is required"],
    },
    address: {
      type: String,
      required: [true, "User Address field is required"],
    },
    email: {
      type: String,
      required: [true, "User Email field is required"],
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
