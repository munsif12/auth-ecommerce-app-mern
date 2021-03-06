const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const productOwnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name field is required"],
    },
    email: {
      type: String,
      // unique: true,
      required: [true, "Email field is required"],
    },
    profileImage: {
      type: String,
      default: "default.jpg",
      require: [true, "Profile Image field is required"],
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "UserId field is required"],
    },
    role: {
      type: String,
      default: "artist",
    },
    //backiing info
  },
  { timeStamps: true }
);

const productOwner = mongoose.model("productOwner", productOwnerSchema);
module.exports = productOwner;
