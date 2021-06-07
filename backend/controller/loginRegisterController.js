const user = require("../models/userModel");
const bcrypt = require("bcrypt");
const loginController = async (req, res) => {
  try {
    const { email, pass } = req.body;
    const userExists = await user.findOne({ email });
    console.log(await bcrypt.compare(pass, userExists.pass));
    const passMatching = await bcrypt.compare(pass, userExists.pass);
    console.log("pass matching" + passMatching);
    if (userExists && (passMatching || pass === userExists.pass)) {
      const gernerateJwtToken = await userExists.generateWebToken(); //generates jwt token fro user
      res
        .status(200)
        .json({ message: "Login successfull!", jwtToken: gernerateJwtToken });
    } else {
      res.status(404).json({ message: "Invalid Details" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Invalid Details" });
  }
};
const registerController = async (req, res) => {
  try {
    //check for null or falsey values entered by user but i am doing that part on frontend
    const { email, pass, cPass } = req.body;
    const emailExists = await user.findOne({ email }); //findOne return the first matched value and reutns  null if not matches check it as !varname or varname ==null ||| find reutnns [] empty error ==> results == []
    if (!emailExists && pass === cPass) {
      // const newuser = new user(req.body); if you want create an is=nastance of user like creating a new user
      const userCreated = await user.create(req.body); //ya line user create b krda ge or middle ware ka through password ko b hash krda ge
      // await userCreated.save(); //no need to write this line jasy hamy pichly project ma keya h 1_MERN_STSCK ma
      res.status(200).json({ status: "success", data: [userCreated] });
    } else {
      res.status(400).json({
        message:
          "email already exists try another one or Password arent matching",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      error: error.message,
    });
  }
};
module.exports = { loginController, registerController };
