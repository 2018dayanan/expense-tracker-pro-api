const mongoose = require("mongoose");
const validator = require("validator");
const userModel = require("../../../models/user.model");

const deleteTransaction = async (req, res) => {
  const transactionModel = mongoose.model("transaction");
  const { deleteTransaction_id } = req.params;
  if (!validator.isMongoId(deleteTransaction_id.toString()))
    throw "Please Provide a valid id!";
  const getTransactions = await transactionModel.findOne({
    _id: deleteTransaction_id,
  });

  if (!getTransactions) throw "No Transaction found";

  if (getTransactions.transaction_type === "income") {
    // income logic here
    await userModel.updateOne(
      {
        _id: getTransactions.user_id,
      },
      {
        $inc: {
          balance: getTransactions.amount * -1,
        },
      },
      {
        runValidators: true,
      }
    );
  } else {
    // expense logic here
    await userModel.updateOne(
      {
        _id: getTransactions.user_id,
      },
      {
        $inc: {
          balance: getTransactions.amount,
        },
      },
      {
        runValidators: true,
      }
    );
  }

  await transactionModel.deleteOne({
    _id: deleteTransaction_id,
  });

  res.status(200).json({
    status: true,
    message: "Delete Successfully!",
  });
};

module.exports = deleteTransaction;
