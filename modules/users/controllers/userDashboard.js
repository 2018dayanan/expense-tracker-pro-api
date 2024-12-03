const mongoose = require("mongoose");
const userDashboard = async (req, res) => {
  const userModel = mongoose.model("users");
  const transactionModel = mongoose.model("transaction");
  const transactiions = await transactionModel
    .find({
      user_id: req.user._id,
    })
    .sort("-createdAt")
    .limit(5);
  const getUser = await userModel
    .findOne({ _id: req.user._id })
    .select("-password");
  res.status(200).json({
    message: "User Dashboard!",
    data: getUser,
    transactiions,
  });
};

module.exports = userDashboard;
