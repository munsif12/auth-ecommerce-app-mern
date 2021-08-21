const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const buyerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name field is required"],
    },
    role: {
      type: String,
      required: [true, "Role field is required"],
      enum: ["artist", "buyer"],
    },
    email: {
      type: String,
      // unique: true,
      required: [true, "Email field is required"],
    },
    profileImage: {
      type: String,
      default: "default.jpg",
      required: [true, "Profile image field is required"],
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "UserId field is required"],
    },
    role: {
      type: String,
      default: "buyer",
    },
    //backiing info
  },
  { timeStamps: true }
);

const buyer = mongoose.model("buyer", buyerSchema);
module.exports = buyer;
