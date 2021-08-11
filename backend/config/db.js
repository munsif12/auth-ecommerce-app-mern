const mongoose = require("mongoose");
require("dotenv").config();
const connection = () => {
  try {
    mongoose
      .connect(process.env.DB_CONN_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
      .then(() => {
        console.log("Connection to mongoDB success");
      })
      .catch((error) => {
        console.log(`Connection to mongoDB failed ${error}`);
        process.exit(1);
      });
  } catch (error) {
    console.log(`Connection to mongoDB failed ${error}`);
    process.exit(1);
  }
};
module.exports = connection;
