const buyer = require("./../models/buyerModel");
const fetchBuyer = async (buyerId) => {
  try {
    console.log("inside fetchbuyer");
    const Buyer = await buyer.findOne({ userId: buyerId });
    console.log(Buyer);
    return Buyer;
  } catch (error) {
    return new Error(error.message);
  }
};

const addBuyer = async (profile) => {
  try {
    const Buyer = await buyer.create(profile);
    return Buyer;
  } catch (error) {
    return new Error(error.message);
  }
};
module.exports = { fetchBuyer, addBuyer };
