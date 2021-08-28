const { promisify } = require("util");
const user = require("../models/userAuthModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const ApiFeatures = require("../utility/commonApiFeature");
const sendEmail = require("../utility/email");
const crypto = require("crypto");
const { addProductOwner } = require("./productOwnerController");
const { addBuyer } = require("./buyerController");

// 2 -> main function start
function signJwtToken(user) {
  return jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}
async function createAndSendResponse(user, res) {
  const token = await signJwtToken(user);
  const { pass, ...restUserDetails } = user.toObject();
  //ya hamna isleya keya taka ham password ko response ma na bajy or baji user details ko baj da
  //mogodb sa jo document uth ka ata ha woh BSON form ma hota ha to usko javascript objet ma convert krny ka leya .toObject likhna pary ga
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + Number(process.env.COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
    ),
    secure: process.env.NODE_ENV === "development" ? true : false,
    httpOnly: true,
  });

  res.status(200).json({
    status: "Success",
    token,
    data: [restUserDetails],
  });
}
// 2 -> main function end
const loginController = async (req, res) => {
  try {
    const { email, pass } = req.body;
    const userExists = await user.findOne({ email }).select("+pass"); //.select("+pass") isleya keya h q ka hamna schema ma selcet false keya h take kisi ko password n mily ab jab hamy zarurat ha pass ke to k=ham force fully nikal rhy ha through .select("+pass") plus ka sambol ana zaruri ha waran sirf id or pass ke value mily ge
    const passMatching = await userExists.verifyPassword(pass, userExists.pass); //userExist 1 document ha joka userSchema ka methods ko access krsakta h q ka userExist dcument userSchema ka structure pa bana hua h -> schema method ka through password ko verify krwadia
    if (userExists && (passMatching || pass === userExists.pass)) {
      // const gernerateJwtToken = await userExists.generateWebToken(); //generates jwt token for user

      createAndSendResponse(userExists, res); //main function which will create jwt and create cookie and also send the response to the user
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

      /* Profile creation */
      const profile = {
        userID: userCreated._id,
        username: userCreated.name,
        email: userCreated.email,
      };
      if (userCreated.role === "productowner")
        var artis = await addProductOwner(profile);
      if (userCreated.role === "buyer") var artis = await addBuyer(profile);
      createAndSendResponse(userCreated, res); //main function which will create jwt and create cookie and also send the response to the user
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
const fetchUsers = async (req, res) => {
  try {
    // console.log(req.user); ya req.user pichly wala middleware add kr ka baj rha h joka page ka last ma define ha protectAuthMidd
    const filter = await new ApiFeatures(user, req.query)
      .filtration()
      .sort()
      .fieldLimitation()
      .pagination()
      .get();

    const { sort, fields, page, limit, ...restQuery } = req.query;
    res.json({
      message: "Success",
      totalPages: Math.floor((await user.countDocuments()) / (limit || 2)),
      users: filter,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};
async function protectAuthMidd(req, res, next) {
  try {
    console.log(req.headers.authorization);
    var token;
    // 1 fetch token from request header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    // console.log(token);
    //2 check if token exists
    if (!token) {
      res.status(401).json({
        error:
          "Middleware => Please sign in first. AuthToken doen't exists in the header",
      });
    }
    //3 now verify the token
    const { id: userEncId, iat: tokenIsseudAt } = await promisify(jwt.verify)(
      token,
      process.env.SECRET_KEY
      // ,data=>console.log(data) =>is callback function ko khtm krny ka leya hamna promisify use keya taka woh is callback ko convert krrka hamy promise return krda or phr ham asani sa await use krsaky
    );
    //4 check if user exists in db
    const userDetail = await user.findById(userEncId).select("+pass");
    if (!userDetail) {
      res
        .status(401)
        .json({ error: "user belonging to this email doesnt exists" });
    }
    //5 is passwword change after token issued
    var passwordChangeAt = userDetail.passwordChangeAt;
    if (passwordChangeAt) {
      var passChangeAfter =
        userDetail.passwordChangeAt.getTime() > tokenIsseudAt * 1000;
      if (passChangeAfter) {
        res
          .status(401)
          .json({ error: "Password has been changed please Login again" });
      }
    }

    req.user = userDetail; //taka middleware sa agy jab dusra func call hoto uska pass user ka data mojood ho
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
} //now you can use this middleware for authentication anywherer in the codebase i have already used it on productRoutes.js

//WORKING ON Roles
const AuthenticateRole =
  (...roles) =>
  (req, res, next) => {
    console.log(req.user.role);
    const userRole = req.user.role;
    if (!roles.includes(userRole)) {
      res
        .status(401)
        .json({ error: "You have no rights to access this route" });
    } else next();
  };
//forgotten password
async function forgottenPassword(req, res) {
  try {
    //vedio lecture => 21
    // get the user email
    const { email } = req.body;
    //find if the email exists in the db
    const userExists = await user.findOne({ email });
    if (!userExists) {
      res.status(400).json({ error: "User not exists with this email!" });
    }
    const passwordResetRandomToken = userExists.passwordResetTokenGenerator();
    await userExists.save({ validateBeforeSave: false }); //doc create ya save hony sa pahly sary validators and middlewares run hoty h isleya ya hamy simple save krny nhi darha q k schema ma password vlaidate horha h isleya hamay validation ko off krdia => save ka ander waly obj ko hata k run krka error check kro
    //now send the token to user
    const msg = `Please Click on the link to reset your password ,Note that the link will expire in 10 minutes -> https://localhost:8000/auth/reset-password/${passwordResetRandomToken}`;
    sendEmail({
      to: email,
      subject: "Password reset token",
      content: msg,
    });
    res.status(200).json({
      status: "success",
      msg: "Pasword Reset Token has been sent to your email",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
async function resetpassword(req, res) {
  try {
    //get the token comming from params
    const { passwordResetToken } = req.params;
    const { pass: password, cPass } = req.body;
    // bcoz the token isnt encrypted and the token inside the db is encrypted so first encrypt and then match the comming token with the user db one
    const encryptedResetToken = crypto
      .createHash("sha256")
      .update(passwordResetToken)
      .digest("hex");
    //comparong
    const userExists = await user.findOne({
      passwordResetToken: encryptedResetToken,
      passwordResetTokenExpires: { $gt: Date.now() },
    });
    // const { pass, ...restUserDetails } = userExists.toObject(); //to remove passwrd before sending response to user => toObject is used to convert bson to javascript
    if (!userExists) {
      res.status(200).json({
        message: `Your token isn't valid or the token has been expired`,
      });
    }
    //now if everything is good then take the new user passwords and save then into database
    userExists.pass = password; //ya ham password validation check isleya nhi karwarhy q ka schema ma validation horhe h or jab b save method call hoga tab validators or middle ware run hony to khud bakhud pass or cPass check hojai ga
    userExists.cPass = cPass; //or isetrah jab b kabhe passwrod change hoga to password khud he ecryypt hojai ga q ka schema method bana hu h pass enc ka jisma likha ha if(isModified(pass)){} isleya encrypt b hojai ga pass
    userExists.passwordResetToken = undefined;
    userExists.passwordResetTokenExpires = undefined;
    await userExists.save();
    //save the token inside the token bcause cookie are secure then localstoreage

    createAndSendResponse(userExists, res); //main function which will create jwt and create cookie and also send the response to the user
  } catch (error) {
    // userExists.passwordResetToken = undefined;
    // userExists.passwordResetTokenExpires = undefined;
    res.status(400).json({ error: error.message });
  }
}
async function updatePassword(req, res) {
  try {
    const { currentPass, newPass, confirmNewPass } = req.body;
    const userExists = await user.findOne(req.user._id);
    const passMatch = await userExists.verifyPassword(
      currentPass,
      req.user.pass
    );
    if (!passMatch) {
      res.status(400).json({
        message: "Your current passord is wrong",
      });
    } else {
      userExists.pass = newPass;
      userExists.cPass = confirmNewPass;
      await userExists.save();
      res.status(400).json({
        message: "Password Updated Successfully",
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  protectAuthMidd,
  loginController,
  registerController,
  fetchUsers,
  AuthenticateRole,
  forgottenPassword,
  resetpassword,
  updatePassword,
};
