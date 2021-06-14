const express = require("express");
const Router = express.Router();

const {
  getAllProductsController,
  addProduct,
  getproductController,
} = require("../controller/productsController");

Router.get("/", getAllProductsController);
Router.post("/add-product", addProduct);
Router.get("/:id", getproductController);

module.exports = Router;
// Date: Tue Jun 8 10:47:45 2021 +0500
