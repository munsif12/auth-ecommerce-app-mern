const express = require("express");
const Router = express.Router();
const {
  loginController,
  registerController,
  fetchUsers,
  protectAuthMidd,
  AuthenticateRole,
  forgottenPassword,
  resetpassword,
} = require("../controller/loginRegisterController");

Router.post("/login", loginController);
Router.post("/register", registerController);
Router.get(
  "/",
  protectAuthMidd,
  AuthenticateRole("admin", "artist"),
  fetchUsers
);
Router.post("/forget-password", forgottenPassword);
Router.post("/reset-password", resetpassword);
//forgotten
module.exports = Router;
