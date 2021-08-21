const express = require("express");
const { fetchBuyer, addBuyer } = require("../controller/buyerController");
const Router = express.Router();
Router.get("/", fetchBuyer);
Router.post("/add-buyer", addBuyer);
module.exports = Router;
