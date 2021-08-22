const productOwner = require("./../models/productOwnerModel");
const fetchProductOwner = (req, res) => {
  try {
    res.status(200).json({ message: "working po" });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
};

const addProductOwner = async (req, res) => {
  try {
    const po = await productOwner.create(req.body);
    res.status(200).json({ message: "success", data: po });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
};
module.exports = { fetchProductOwner, addProductOwner };
