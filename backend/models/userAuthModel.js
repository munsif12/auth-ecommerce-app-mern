const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name field is required"],
    },
    role: {
      type: String,
      required: [true, "Role field is required"],
      enum: ["artist", "buyer"],
    },
    email: {
      type: String,
      // unique: true,
      required: [true, "Email field is required"],
    },
    pass: {
      type: String,
      minLength: [8, "Please enter minimum 8 characyers"],
      required: [true, "Password field is required"],
      select: false,
    },
    cPass: {
      type: String,
      required: [true, "Conform password field is required"],
      validate: {
        //custom validatory
        validator: function (cPass) {
          return this.pass === cPass;
        },
        message: "Password arent matching",
      },
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
/* hashing user password
all pre methods in mongoose => 1) save 2) remove 3) updateOne 4)deleteOne 5) init (note: init hooks are synchronous) */

userSchema.methods.passwordResetTokenGenerator = function () {
  // first genereate a random 32bit string
  // encrypt the generated string
  // now save the token into db
};
userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("pass")) {
      this.pass = await bcrypt.hash(this.pass, 10);
      this.cPass = undefined;
    }
    next();
  } catch (error) {
    console.log(`user Password hasing error ${error}`);
  }
});
// varifications of password -> we can also implent this feature in controllerfile
//h=jo document isschema ke base ya structure sa bany ga ussy ya method available hoga
userSchema.methods.verifyPassword = async (pass, hashPass) => {
  return await bcrypt.compare(pass, hashPass);
};

//creating token when user login
userSchema.methods.generateWebToken = async function () {
  try {
    const jwtToken = jwt.sign(
      {
        id: this._id,
      },
      process.env.SECRET_KEY,
      {
        /* expiresIn:'1d' => contains expiry date but leave it empty */
      }
    );
    //saving token to userDb
    this.tokens = this.tokens.concat({
      token: jwtToken,
    });
    await this.save(); /* this line will actually save your generated token to user specifific document */
    return jwtToken; //taka ham localstorage ma set krrka bad ma user ke har request ka sath match krsaky
  } catch (error) {
    console.log(`user JWT token Creation error ${error}`);
  }
};

const user = mongoose.model("user", userSchema);
module.exports = user;
