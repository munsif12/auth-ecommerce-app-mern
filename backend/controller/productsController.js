const product = require("../models/productModel");
const getAllProductsController = (req, res) => {
  try {
    const allproducts = await product.find({});
    if (allproducts) {
      res.status(200).json({
        data: allproducts,
      });
    } else {
      res.status(400).json({
        message: "No Product available right now",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const getproductController = (req, res) => {
  res.json({ productId: req.params.id });
};
module.exports = { getAllProductsController, getproductController };
