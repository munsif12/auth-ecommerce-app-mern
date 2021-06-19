const mongose = require("mongoose");
const productSchema = new mongose.Schema(
  {
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
  },
  {
    collection: "products",
    timestamps: true,
  }
);

const product = new mongose.model("product", productSchema, "products");

module.exports = product;
