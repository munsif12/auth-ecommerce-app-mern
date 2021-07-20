const express = require("express");
const Router = express.Router();
const {
  loginController,
  registerController,
  fetchUsers,
  protectAuthMidd,
  AuthenticateRole,
} = require("../controller/loginRegisterController");

Router.post("/login", loginController);
Router.post("/register", registerController);
Router.get(
  "/",
  protectAuthMidd,
  AuthenticateRole("admin", "artist"),
  fetchUsers
);

module.exports = Router;
