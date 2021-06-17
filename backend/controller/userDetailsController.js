const userDetails = require("../models/userDetailsModel");

const addNewUserDetail = async (req, res) => {
  try {
    const user = await userDetails.create(req.body);
    res.json({ message: "New User Added Successfully", user });
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
};
const fetchUsersDetails = async (req, res) => {
  try {
    res.json({ productId: "User Filteration successfully" });
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
};

const fetchUserDetail = async (req, res) => {
  try {
    res.json({ productId: "User Detail successfully" });
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
};
module.exports = { fetchUsersDetails, addNewUserDetail, fetchUserDetail };
