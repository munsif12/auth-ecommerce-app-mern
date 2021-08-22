const express = require("express");
const {
  fetchProductOwner,
  addProductOwner,
} = require("../controller/productOwnerController");
const Router = express.Router();
Router.get("/", fetchProductOwner);
Router.post("/add-po", addProductOwner);
module.exports = Router;
