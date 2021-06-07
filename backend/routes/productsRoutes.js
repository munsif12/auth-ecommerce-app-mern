const express = require("express");
const Router = express.Router();

const {
  getAllProductsController,
  getproductController,
} = require("../controller/productsController");

Router.get("/", getAllProductsController);
Router.get("/:id", getproductController);

module.exports = Router;
