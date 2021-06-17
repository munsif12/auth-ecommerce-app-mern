const express = require("express");
const Router = express.Router();

const {
  fetchUsersDetails,
  addNewUserDetail,
  fetchUserDetail,
} = require("../controller/userDetailsController");

Router.get("/", fetchUsersDetails);
Router.post("/new-user", addNewUserDetail);
Router.get("/:_id", fetchUserDetail); //to get  single user

module.exports = Router;
