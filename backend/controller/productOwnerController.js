const productOwner = require("./../models/productOwnerModel");
const fetchProductOwner = async (productOwnerId) => {
  try {
    const ProductOwner = await productOwner.findOne({ userId: productOwnerId });
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
