const mongoose = reuire("mongoose");
require("dotenv").config();
mongoose
  .connect(process.env.DB_CONN_URL, {})
  .then(() => {
    console.log("Connection to mongoDB success");
  })
  .catch((error) => {
    console.log(`Connection to mongoDB failed ${error}`);
  });
