const mongoose = require("mongoose");
const reviewsSchema = mongoose.Schema(
  {
    review: String,
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    reviewedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
    productId: mongoose.Schema.ObjectId, //child to parent relationship q ka product k ander reviews aty h
  },
  {
    timestamps: true,
  }
);
reviewsSchema.pre(/^find/, function (next) {
  this.populate({
    path: "reviewedBy",
    select: "name email",
  });
  next();
});
const review = new mongoose.model("review", reviewsSchema);
module.exports = review;
