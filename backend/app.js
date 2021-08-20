const express = require("express");
require("dotenv").config();
const app = express();
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit"); //to prevent brute force attacks
const mongoSanitize = require("express-mongo-sanitize"); //to prevent sql query attack
var xss = require("xss-clean"); //to prevent from injecting scripts like html scripts (alert etc)
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour minutes
  max: 1000, // limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again after 1 hour. ",
});

//  apply to all requests

//importing routes
const loginRegisterRoute = require("./routes/loginRegisterRoute");
const productsRoutes = require("./routes/productsRoutes");
const userDetails = require("./routes/userDetailsRoutes");
const reviewsRoutes = require("./routes/reviewsRoute");
//making connection to db
const connection = require("./config/db");
connection();
const PORT = process.env.PORT || 5000;
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(limiter);
app.use(mongoSanitize()); //must come after express.json()
app.use(xss());
//routes middleware
app.use("/auth", loginRegisterRoute);
app.use("/user/details", userDetails);
app.use("/api/v1/products", productsRoutes);
// app.use("/api/v1/reviews", reviewsRoutes); //used nested routing  go check inside products route u will find /:id/reviews

//listening to requests at port 8000
app.listen(PORT, () => {
  console.log(`Server runnig successfully on port : ${PORT}`);
});
