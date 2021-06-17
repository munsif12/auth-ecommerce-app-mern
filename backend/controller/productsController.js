const product = require("../models/productModel");
const getAllProductsController = async (req, res) => {
  console.log(req.query);
  try {
    const queryString = JSON.stringify(req.query); //converted the object into json so we can perform regex on incomming query
    const replacedString = queryString.replace(
      /\b(gt|lt|gte|lte)\b/g, // 1) -> regex is written in between \ \  2) -> \b\b => compare whole word  3) -> g => match whole string (global)
      (match) => `$${match}`
    ); // emabded $ sign with (gt|lt|gte|lte)
    const Query = JSON.parse(replacedString); //again converting it into JS object so we can pass that as query to mongodb
    const allproducts = await product.find(Query);
    if (allproducts) {
      res.status(200).json({
        products: allproducts.length,
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
    res.json({ productId: "product added successfully", product: prod });
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
};
const getproductController = async (req, res) => {
  try {
    console.log(req.params);
    const prodRelatedToId = await product.findOne(req.params.id); //agr url ma id ka sth underscore na lagaty joka db ma field ha to hamy idr hardcode karna parta like /* findOne({ _id:req.params.id})
    res.json({ product: prodRelatedToId });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { getAllProductsController, addProduct, getproductController };
