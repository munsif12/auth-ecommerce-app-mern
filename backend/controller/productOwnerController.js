const productOwner = require("./../models/productOwnerModel");
const fetchProductOwner = (req, res) => {
  try {
    res.status(200).json({ message: "product owner route working" });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
};

const addProductOwner = async (req, res) => {
  try {
    const ProductOwner = await productOwner.create(req.body);
    res.status(200).json({ message: "success", data: ProductOwner });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
};
module.exports = { fetchProductOwner, addProductOwner };
