const express = require("express");
const Router = express.Router();
require("../models/userAuthModel");

const {
  getAllProductsController,
  addProduct,
  getproductController,
  likeProduct,
  dislikeProduct,
  imageUpload,
} = require("../controller/productsController");
const {
  protectAuthMidd,
  AuthenticateRole,
} = require("../controller/loginRegisterController");
const reviewsRoute = require("./reviewsRoute");
//middleware
Router.use("/:id/review", reviewsRoute);
//all routes
Router.get("/", getAllProductsController); //everyone can access this route login or not login
Router.post(
  "/add-product",
  protectAuthMidd,
  AuthenticateRole("artist", "productowner"),
  imageUpload,
  addProduct
);
Router.get("/:id", getproductController);
Router.post(
  "/:id/like-product",
  protectAuthMidd,
  AuthenticateRole("artist", "buyer"),
  likeProduct
);
Router.post(
  "/:id/dislike-product",
  protectAuthMidd,
  AuthenticateRole("artist", "buyer"),
  dislikeProduct
);

module.exports = Router;
// Date: Tue Jun 8 10:47:45 2021 +0500
