const buyer = require("./../models/buyerModel");
const fetchBuyer = (req, res) => {
  res.status(200).json({ message: "working" });
};

const addBuyer = async (req, res) => {
  try {
    const Buyer = await buyer.create(req.body);
    res.status(200).json({ message: "success", data: Buyer });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
};
module.exports = { fetchBuyer, addBuyer };
