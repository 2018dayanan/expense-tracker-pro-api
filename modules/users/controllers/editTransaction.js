const mongoose = require("mongoose");
const validator = require("validator");
const editTransaction = async (req, res) => {
  const transactionModel = mongoose.model("transaction");

  const { transaction_id, remark } = req.body;

  if (!validator.isMongoId(transaction_id.toString()))
    throw "Please Provide a valid id!";

  const getTransactions = await transactionModel.findOne({
    _id: transaction_id,
  });

  if (!getTransactions) throw "No Transaction found";
  await transactionModel.updateOne(
    {
      _id: transaction_id,
    },
    {
      remark,
    },
    {
      runValidators: true,
    }
  );
  res.status(200).json({
    status: true,
    message: "Edited Successfully!",
  });
};
module.exports = editTransaction;
