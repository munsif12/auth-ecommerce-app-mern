const product = require("../models/productModel");
const getAllProductsController = async (req, res) => {
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
const addProduct = async (req, res) => {
  try {
    const prod = await product.create(req.body);
    res.json({ productId: "product added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
};
const getproductController = (req, res) => {
  res.json({ productId: req.params.id });
};
module.exports = { getAllProductsController, addProduct, getproductController };
