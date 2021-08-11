const mongose = require("mongoose");
const {
  Schema: { ObjectId },
} = require("mongoose");
const productSchema = new mongose.Schema(
  {
    artist: {
      type: ObjectId,
      ref: "user", //woh collection name jaha ya user mojood ha without s joka collection name ka end pa laga hota h use krna wanra error aiy ga => Schema hasn't been registered for model "users".
      required: [true, "Product must belong to a user"],
    },
    name: {
      type: String,
      required: [true, "Product Name field is required"],
    },
    desc: {
      type: String,
    },
    img: {
      type: String,
      required: [true, "Product Image field is required"],
    },
    price: {
      type: Number,
      required: true,
    },
    noOfItemsInStock: {
      type: Number,
      required: true,
    },
    likes: [ObjectId],
    likesCount: {
      type: Number,
      default: 0,
    },
  },
  {
    collection: "products",
    timestamps: true,
  }
);
productSchema.pre(/^find/, function (next) {
  //regular expression use keya taka jaha b find | findOne mtlb jis be query ma find mily to ya fucntion run ho or artist ka data send kary
  this.populate({
    path: "artist",
    select: "name email",
  });
  next();
});
const product = new mongose.model("product", productSchema, "products");

module.exports = product;
