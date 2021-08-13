const express = require("express");
const {
  AuthenticateRole,
  protectAuthMidd,
} = require("../controller/loginRegisterController");
const { getReview, addReview } = require("../controller/reviewsController");
// const { protectAuthMidd } = require("../controller/userDetailsController");
const Router = express.Router({ mergeParams: true });

Router.get(
  "/",
  protectAuthMidd,
  AuthenticateRole("artist", "buyer"),
  getReview
);
Router.post(
  "/add-review",
  protectAuthMidd,
  AuthenticateRole("artist", "buyer"),
  addReview
);
module.exports = Router;
