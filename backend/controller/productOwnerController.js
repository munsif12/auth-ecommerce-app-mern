const productOwner = require("./../models/productOwnerModel");
const fetchProductOwner = (req, res) => {
  try {
    const ProductOwner = await productOwner.create(profile);
    return ProductOwner;
  } catch (error) {
    return new Error(error.message);
  }
};

const addProductOwner = async (profile) => {
  try {
    const ProductOwner = await productOwner.create(profile);
    return ProductOwner;
  } catch (error) {
    return new Error(error.message);
  }
};
module.exports = { fetchProductOwner, addProductOwner };
