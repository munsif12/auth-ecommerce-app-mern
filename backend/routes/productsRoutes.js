const express = require("express");
const { protectAuthMidd } = require("../controller/userDetailsController");
const Router = express.Router();

const {
  getAllProductsController,
  addProduct,
  getproductController,
} = require("../controller/productsController");

Router.get("/", protectAuthMidd, getAllProductsController);
Router.post("/add-product", addProduct);
Router.get("/:_id", getproductController);

module.exports = Router;
// Date: Tue Jun 8 10:47:45 2021 +0500
