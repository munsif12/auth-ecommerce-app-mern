const userDetails = require("../models/userDetailsModel");

//concept of advance filtering added in this file like
/*  
   1 => price filterign like product price >= 200 && <= 100  ==> collectin.find({productPrice:{$gte:200,$lte:1000}})
   2=> quering in object ==> collectin.find({"city.street":"street no 22"})
   3 => quering and array ==> collectin.find({favProducts:{$in:['iphone','window']}}) 
   4 => filtering and then sorting ==> collectin.find({productPrice:{$gte:200,$lte:1000}}).sort("-productPrice") +=> ( - ) minus for desc bydefault ascen without
   5 => filds limitation query.select(" names of fileds like age ,name etc") ==> params fields=name,age now if we but minus ( - ) infront of any filed to sirf woh field nhi i ge or baqi aiy ge
   6 => Pagination
   -*/
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
    const { sort, fields, page, limit, ...restQuery } = req.query;
    console.log(restQuery);
    const query = JSON.stringify(restQuery);
    const addDollerSign = query.replace(
      /\b(gt|lt|lte|gte|in|all)\b/g,
      (match) => `$${match}`
    );
    var user = userDetails.find(
      JSON.parse(addDollerSign)
    ); /* .sort(sort);  dont resolve the promise herer bcoz we want ot chain another method to it which one is sort */
    /*/favProducs: { $in: ["windows","iphone"] }, to search in array => $in op  works like or operator and $all work like and 
    op ka jis documeent ka favProducts ka array ma window or iphone ho sirf wohe document send kro*/

    // *** IMPORTANT TOPIC *** => SORTING
    if (sort) {
      const sortOn = sort.split(",").join(" "); //working ParamsComming as ( name,age ) with comma we have to remove them now .split => [ name , age].join(" ") ==> result (name age)  here we removed the comma becoz for sorting and selecting the query is model.select("name agr")
      user = user.sort(sortOn); //still not resolving the promise here bcoz we have one more method to chain which is .select for selecting required firlds
    } else {
      user = user.sort("createdAt"); //still not resolving the promise here bcoz we have one more method to chain which is .select for selecting required firlds
    }
    // *** IMPORTANT TOPIC *** => FIleds Limiting
    if (fields) {
      // console.log(fileds);
      const fieldsConToStr = fields.split(",").join(" "); //working ParamsComming as ( name,age ) with comma we have to remove them now .split => [ name , age].join(" ") ==> result (name age)  here we removed the comma becoz for sorting and selecting the query is model.select("name agr")
      user = user.select(fieldsConToStr);
      // console.log(await user);
    }
    //adding pagination
    const limit = limit || 2;
    const page = page || 1;
    user = await user; //now here we are reolving promise after chaining 2 more methods (sort and select)
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
