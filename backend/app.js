const express = require("express");
require("dotenv").config();
const app = express();

//importing routes
const loginRegisterRoute = require("./routes/loginRegisterRoute");
//making connection to db
const connection = require("./config/db");
connection();
const PORT = process.env.PORT || 5000;
//middlewares
app.use(express.json());
//routes middleware
app.use("/user", loginRegisterRoute);
app.listen(PORT, () => {
  console.log(`Server runnig successfully on port : ${PORT}`);
});
