const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    pass: {
      type: String,
      required: true,
    },
    cPass: {
      type: String,
      required: true,
    },
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
userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("pass")) {
      this.pass = await bcrypt.hash(this.pass, 10);
    }
    next();
  } catch (error) {
    console.log(`user Password hasing error ${error}`);
  }
});

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
