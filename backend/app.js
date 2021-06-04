const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.json({ message: "running " });
});
app.listen(PORT, () => {
  console.log(`Server runnig successfully on port : ${PORT}`);
});
