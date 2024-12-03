const { mongo, default: mongoose } = require("mongoose");

const getTransactions = async (req, res) => {
  const transactionModel = mongoose.model("transaction");
  transactions = await transactionModel.find({
    user_id: req.user._id,
    ...req.query,
  });
  res.status(200).json({
    status: true,
    data: transactions,
  });
};
module.exports = getTransactions;
