const mongoose = require("mongoose");
const validator = require("validator");
const userModel = require("../../../models/user.model");
const addExpense = async (req, res) => {
  const userModels = mongoose.model("users");
  const transactionsModels = mongoose.model("transaction");
  const { amount, remark } = req.body;
  if (!amount) throw "Amount is required";
  if (!remark) throw "Remark is required";
  if (remark.length < 5) throw "Remarks must be at least 5 character logn!";

  if (!validator.isNumeric(amount.toString()))
    throw "Amount must be a valid number";
  if (amount < 0) throw "Amount must not be negative";

  const user = await userModel.findById(req.user._id);
  if (!user) throw "User not found";

  if (user.balance - amount < 0) throw "Insufficient Balance!";

  await transactionsModels.create({
    user_id: req.user._id,
    amount: amount,
    remark: remark,
    transaction_type: "expense",
  });

  await userModel.updateOne(
    {
      _id: req.user._id,
    },
    {
      $inc: {
        balance: amount * -1,
      },
    },
    {
      runValidators: true,
    }
  );
  res.status(200).json({
    status: true,
    message: "Expense Added Successfully!",
  });
};

module.exports = addExpense;
