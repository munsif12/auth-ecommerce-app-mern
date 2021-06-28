const userDetails = require("../models/userDetailsModel");
const ApiFeatures = require("../utility/commonApiFeature");
const jwt = require("jsonwebtoken");

//concept of advance filtering added in this file like
/*  
   1 => price filterign like product price >= 200 && <= 100  ==> collectin.find({productPrice:{$gte:200,$lte:1000}})
   2=> quering in object ==> collectin.find({"city.street":"street no 22"})
   3 => quering and array ==> collectin.find({favProducts:{$in:['iphone','window']}}) 
   4 => filtering and then sorting ==> collectin.find({productPrice:{$gte:200,$lte:1000}}).sort("-productPrice") +=> ( - ) minus for desc bydefault ascen without
   5 => filds limitation query.select(" names of fileds like age ,name etc") ==> params fields=name,age now if we but minus ( - ) infront of any filed to sirf woh field nhi i ge or baqi aiy ge
   6 => Pagination
   7 => Code cleanups Or using class to reuse the code in multidiff files
   -*/

// class ApiFeatures {
//   constructor(model, query) {
//     this.model = model;
//     this.queryParams = query;
//     this.query = null;
//   }
//   filtration() {
//     try {
//       const { sort, fields, page, limit, ...restQuery } = this.queryParams;
//       this.query = JSON.stringify(restQuery);
//       const addDollerSign = this.query.replace(
//         /\b(gt|lt|lte|gte|in|all)\b/g,
//         (match) => `$${match}`
//       );
//       this.query = userDetails.find(JSON.parse(addDollerSign));
//       return this;
//     } catch (error) {
//       res.status(401).json({
//         error: error.message,
//       });
//     }
//   }
//   sort() {
//     if (this.queryParams.sort) {
//       const sortOn = this.queryParams.sort.split(",").join(" "); //working ParamsComming as ( name,age ) with comma we have to remove them now .split => [ name , age].join(" ") ==> result (name age)  here we removed the comma becoz for sorting and selecting the query is model.select("name agr")
//       this.query = this.query.sort(sortOn); //still not resolving the promise here bcoz we have one more method to chain which is .select for selecting required firlds
//     } else {
//       this.query = this.query.sort("createdAt"); //still not resolving the promise here bcoz we have one more method to chain which is .select for selecting required firlds
//     }
//     return this;
//   }
//   fieldLimitation() {
//     if (this.queryParams.fields) {
//       // console.log(fileds);
//       const fieldsConToStr = this.queryParams.fields.split(",").join(" "); //working ParamsComming as ( name,age ) with comma we have to remove them now .split => [ name , age].join(" ") ==> result (name age)  here we removed the comma becoz for sorting and selecting the query is model.select("name agr")
//       this.query = this.query.select(fieldsConToStr);
//       // console.log(await user);
//     }
//     return this;
//   }
//   pagination() {
//     const reqLimit = this.queryParams.limit || 2;
//     const reqPage = this.queryParams.page || 1;
//     const skipValues = (reqPage - 1) * reqLimit;
//     this.query = this.query.skip(skipValues).limit(Number(reqLimit));
//     return this;
//   }
//   get() {
//     return this.query;
//   }
// }
const addNewUserDetail = async (req, res) => {
  try {
    const user = await userDetails.create(req.body);
    res.json({ message: "New User Added Successfully", user });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};

//******** MOST IMPORTANT ROUTE ************ */
const fetchUsersDetails = async (req, res) => {
  // console.log(req.query);
  try {
    const filter = await new ApiFeatures(userDetails, req.query)
      .filtration()
      .sort()
      .fieldLimitation()
      .pagination()
      .get();

    const { sort, fields, page, limit, ...restQuery } = req.query;
    // console.log(restQuery);
    // const query = JSON.stringify(restQuery);
    // const addDollerSign = query.replace(
    //   /\b(gt|lt|lte|gte|in|all)\b/g,
    //   (match) => `$${match}`
    // );
    // var user = userDetails.find(
    //   JSON.parse(addDollerSign)
    // ); /* .sort(sort);  dont resolve the promise herer bcoz we want ot chain another method to it which one is sort */
    /*/favProducs: { $in: ["windows","iphone"] }, to search in array => $in op  works like or operator and $all work like and 
    op ka jis documeent ka favProducts ka array ma window or iphone ho sirf wohe document send kro*/

    // *** IMPORTANT TOPIC *** => SORTING
    // if (sort) {
    //   const sortOn = sort.split(",").join(" "); //working ParamsComming as ( name,age ) with comma we have to remove them now .split => [ name , age].join(" ") ==> result (name age)  here we removed the comma becoz for sorting and selecting the query is model.select("name agr")
    //   user = user.sort(sortOn); //still not resolving the promise here bcoz we have one more method to chain which is .select for selecting required firlds
    // } else {
    //   user = user.sort("createdAt"); //still not resolving the promise here bcoz we have one more method to chain which is .select for selecting required firlds
    // }
    // // *** IMPORTANT TOPIC *** => FIleds Limiting
    // if (fields) {
    //   // console.log(fileds);
    //   const fieldsConToStr = fields.split(",").join(" "); //working ParamsComming as ( name,age ) with comma we have to remove them now .split => [ name , age].join(" ") ==> result (name age)  here we removed the comma becoz for sorting and selecting the query is model.select("name agr")
    //   user = user.select(fieldsConToStr);
    //   // console.log(await user);
    // }
    // //adding pagination
    // const reqLimit = limit || 2;
    // const reqPage = page || 1;
    // const skipValues = (reqPage - 1) * limit;
    // user = user.skip(skipValues).limit(Number(reqLimit));
    // const totalDocuments = await userDetails.countDocuments(); //to get total documents in collection taka iska use ham totalNoOfPages calculate krny k ley krsaky
    // user = await user; //now here we are reolving promise after chaining 2 more methods (sort and select)
    res.json({
      message: "Success",
      totalPages: Math.floor(
        (await userDetails.countDocuments()) / (limit || 2)
      ),
      users: filter,
    });
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
//middle ware to check wether user is signedin or not
function protectAuthMidd(req, res, next) {
  var token;
  // 1 fetch token from request header
  if(req.headers.auth &&req.headers.auth.startsWith("bearer")){
         token=&req.headers.auth.split(" ")[1]
  }
  if(!token){
    res.status(401).json({ error: "Please sign in first" });
  }
  //3 now verify the token
  const tokenVarification=promisify(jwt.verify)(token,process.env.SECRET_KEY)
  next();
}

module.exports = {
  fetchUsersDetails,
  addNewUserDetail,
  fetchUserDetail,
  protectAuthMidd,
};
