const express = require("express");
const Router = express.Router();
const {
  loginController,
  registerController,
} = require("../controller/loginRegisterController");

Router.get("/login", loginController);
Router.post("/register", registerController);

module.exports = Router;
