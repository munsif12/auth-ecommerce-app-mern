const mongose = require("mongoose");
const productSchema = new mongose.Schema(
  {
    artist: {
      type: mongose.Schema.ObjectId,
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
    likes: [mongose.Schema.ObjectId],
    likesCount: {
      type: Number,
      default: 0,
    },
  },
  {
    collection: "products",
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    }, // ya 2 fileds must ha jab ap virtuals mangwa rhy ho means virtaul properties create krhhy ho
    timestamps: true,
  }
);
//to understand virtual pop  you must understand virtual poperties -> below example is for virtual properties
// virtual properties --> virtual properties are not stored in the database but are computed from other fields.
//virtual properties have bith getter and setter methods. getter method is used to get the value of the virtual property. and setter method is used to set the value of the virtual property.
// --> productSchema.virtual("reviews").get(function () {}).set(function () {}); <-- this is for virtual properties
//just uncomment the below code and run the app and you will see the difference in the database and the response result
// productSchema.virtual("reviews").get(function () {
//   return `${this.name} --> for for understing virtual properties`;
// });

//now virtual populate example
productSchema.virtual("reviews", {
  ref: "review", //virtual hony ke waja sa hamna ref yaha dala h -> bajai ka ham product colection ka ander dalty jasa hamna likes k leya keya tha
  localField: "_id", //pointing to current document id
  foreignField: "productId", //matlab ka review collction (ka kis field ma productId pare h ) ma kis field ka sath jakr compare krna h localfield ko
}); //refrencing krde ha ab populate ko b call krna han means raha ref use hoga waha populate be use hoga
//or iske population ham na getProdById ma ke ha

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
