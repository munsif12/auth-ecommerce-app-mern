const express = require("express");
const Router = express.Router();
const {
  loginController,
  registerController,
  fetchUsers,
  protectAuthMidd,
} = require("../controller/loginRegisterController");

Router.post("/login", loginController);
Router.post("/register", registerController);
Router.get("/", protectAuthMidd, fetchUsers);

module.exports = Router;
