const getAllProductsController = (req, res) => {
  res.json({ message: "success" });
};
const getproductController = (req, res) => {
  res.json({ productId: req.params.id });
};
module.exports = { getAllProductsController, getproductController };
