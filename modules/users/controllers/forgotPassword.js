const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const emailManager = require("../../../manager/emailManager");
const forgotPassword = async (req, res) => {
  const userModels = mongoose.model("users");
  const { email } = req.body;

  const getUser = await userModels.findOne({
    email: email,
  });
  if (!getUser) throw "Email dosenot exit.";

  const resetCode = Math.floor(10000 + Math.random() * 90000);

  await userModels.updateOne(
    {
      email: email,
    },
    {
      reset_code: resetCode,
    },
    {
      runValidators: true,
    }
  );

  await emailManager(
    email,
    "Welcome to expense tracker pro",
    "Forgot Password Reset Code.",
    "<h1 style='background:#eeeeee,font-family:sans-serif'>Your Password Reset Code Is: " +
      resetCode +
      "</h1>"
  );
  res.status(200).json({
    status: true,
    message: "Reset Code sent to email Successfully!",
  });
};
module.exports = forgotPassword;
