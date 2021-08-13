const mongoose = require("mongoose");
const reviewsSchema = mongoose.Schema(
  {
    review: String,
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    reviewedBy: mongoose.Schema.ObjectId,
    productId: mongoose.Schema.ObjectId,
  },
  {
    timestamps: true,
  }
);
const review = new mongoose.model("review", reviewsSchema);
module.exports = review;
