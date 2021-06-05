const user = require("../models/userModel");
const loginController = async (req, res) => {
  try {
    const { email, pass } = req.body;
    const userValid = await user.findOne({ email, pass });
    console.log(userValid);
    userValid
      ? res.status(200).json({ message: "Login successfull!" })
      : res.status(404).json({ message: "Invalid Details" });
  } catch (error) {
    console.log(error);
  }
};
const registerController = async (req, res) => {
  try {
    //check for null or falsey values entered by user but i am doing that part on frontend
    const { email, pass, cPass } = req.body;
    const emailExists = await user.findOne({ email }); //findOne return the first matched value and reutns  null if not matches check it as !varname or varname ==null ||| find reutnns [] empty error ==> results == []
    if (!emailExists && pass === cPass) {
      const userCreated = await user.create(req.body);
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
