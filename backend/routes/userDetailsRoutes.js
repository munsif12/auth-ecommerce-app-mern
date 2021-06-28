const express = require("express");
const Router = express.Router();

const {
  fetchUsersDetails,
  addNewUserDetail,
  fetchUserDetail,
  protectAuthMidd,
} = require("../controller/userDetailsController");

Router.get("/", protectAuthMidd, fetchUsersDetails);
Router.post("/new-user", addNewUserDetail);
Router.get("/:_id", fetchUserDetail); //to get  single user

module.exports = Router;
