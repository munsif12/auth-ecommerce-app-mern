const mongose = require("mongoose");
const productSchema = new mongose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
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
