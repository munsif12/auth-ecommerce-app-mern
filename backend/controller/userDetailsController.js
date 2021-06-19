const userDetails = require("../models/userDetailsModel");

//concept of advance filtering added in this file like
/*  
   1 => price filterign like product price >= 200 && <= 100  ==> collectin.find({productPrice:{$gte:200,$lte:1000}})
   2=> quering in object ==> collectin.find({"city.street":"street no 22"})
   3 => quering and array ==> collectin.find({favProducts:{$in:['iphone','window']}}) 
   4 => filtering and then sorting ==> collectin.find({productPrice:{$gte:200,$lte:1000}}).sort("-productPrice") +=> ( - ) minus for desc bydefault ascen without -*/
const addNewUserDetail = async (req, res) => {
  try {
    const user = await userDetails.create(req.body);
    res.json({ message: "New User Added Successfully", user });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};
const fetchUsersDetails = async (req, res) => {
  try {
    const { sort, ...restQuery } = req.query;
    console.log(restQuery);
    const query = JSON.stringify(restQuery);
    const addDollerSign = query.replace(
      /\b(gt|lt|lte|gte|in|all)\b/g,
      (match) => `$${match}`
    );
    const user = await userDetails.find(JSON.parse(addDollerSign)).sort(sort);
    /*/favProducs: { $in: ["windows","iphone"] }, to search in array => $in op  works like or operator and $all work like and 
    op ka jis documeent ka favProducts ka array ma window or iphone ho sirf wohe document send kro*/
    res.json({ message: "Success", users: user });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};

const fetchUserDetail = async (req, res) => {
  try {
    res.json({ productId: "User Detail successfully" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};
module.exports = { fetchUsersDetails, addNewUserDetail, fetchUserDetail };
