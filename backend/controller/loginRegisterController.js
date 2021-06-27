const user = require("../models/userAuthModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const loginController = async (req, res) => {
  try {
    const { email, pass } = req.body;
    const userExists = await user.findOne({ email }).select("+pass"); //.select("+pass") isleya keya h q ka hamna schema ma selcet false keya h take kisi ko password n mily ab jab hamy zarurat ha pass ke to k=ham force fully nikal rhy ha through .select("+pass") plus ka sambol ana zaruri ha waran sirf id or pass ke value mily ge
    const passMatching = await userExists.verifyPassword(pass, userExists.pass); //userExist 1 document ha joka userSchema ka methods ko access krsakta h q ka userExist dcument userSchema ka structure pa bana hua h -> schema method ka through password ko verify krwadia
    if (userExists && (passMatching || pass === userExists.pass)) {
      // const gernerateJwtToken = await userExists.generateWebToken(); //generates jwt token for user
      const token = await jwt.sign(
        { id: userExists._id },
        process.env.SECRET_KEY,
        {
          expiresIn: process.env.JWT_EXPIRES_IN,
        }
      );
      const { pass, ...restUserDetails } = userExists.toObject();
      res.status(200).json({
        status: "Success",
        token,
        message: "Login successfull!",
        data: [restUserDetails],
      });
    } else {
      res.status(404).json({ message: "Invalid Details" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ status: "error", message: error.message });
  }
};
// signup completed
const registerController = async (req, res) => {
  try {
    //check for null or falsey values entered by user but i am doing that part on frontend
    const { email } = req.body;
    const emailExists = await user.findOne({ email }); //findOne return the first matched value and reutns  null if not matches check it as !varname or varname ==null ||| find reutnns [] empty error ==> results == []
    if (!emailExists) {
      // const newuser = new user(req.body); if you want create an is=nastance of user like creating a new user
      const userCreated = await user.create(req.body); //ya line user create b krda ge or middle ware ka through password ko b hash krda ge
      // await userCreated.save(); //no need to write this line jasy hamy pichly project ma keya h 1_MERN_STSCK ma
      const { pass, ...restUserDetails } = userCreated.toObject();
      //ya hamna isleya keya taka ham password ko response ma na bajy or baji user details ko baj da
      //mogodb sa jo document uth ka ata ha woh BSON form ma hota ha to usko javascript objet ma convert krny ka leya .toObject likhna pary ga
      const token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      res
        .status(200)
        .json({ status: "success", token, data: [restUserDetails] });
    } else {
      res.status(400).json({
        message: "email already exists try another one",
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
