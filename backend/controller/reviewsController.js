const review = require("../models/reviewsModel");
const { find } = require("../models/userAuthModel");
const getReview = async (req, res) => {
  try {
    res.status(200).json(await review.find({ productId: req.params.id }));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const addReview = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { _id: userId } = req.user;

    req.body.productId = productId; //ya isleya ka review ka time user ko prodcuId or UserId send na krna pry usedId hamy jwt sa mily or ProductId hmy params sa mily ga iska or or b fida h woh ya ka sirf logid in user he review add krsakta h
    req.body.reviewedBy = userId;

    const Review = await review.create(req.body);
    res.status(400).json({ Review });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = { getReview, addReview };
