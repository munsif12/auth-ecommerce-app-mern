const express = require("express");
require("dotenv").config();
const app = express();
const cookieParser = require("cookie-parser");
//importing routes
const loginRegisterRoute = require("./routes/loginRegisterRoute");
const productsRoutes = require("./routes/productsRoutes");
const userDetails = require("./routes/userDetailsRoutes");
//making connection to db
const connection = require("./config/db");
connection();
const PORT = process.env.PORT || 5000;
//middlewares
app.use(express.json());
// app.use(cookieParser());
//routes middleware
app.use("/auth", loginRegisterRoute);
app.use("/user/details", userDetails);
app.use("/api/v1/products", productsRoutes);

//listening to requests at port 8000
app.listen(PORT, () => {
  console.log(`Server runnig successfully on port : ${PORT}`);
});
