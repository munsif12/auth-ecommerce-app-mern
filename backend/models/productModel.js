const mongose = require("mongoose");
const productSchema = new mongose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    prodDesc: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    inStock: {
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
