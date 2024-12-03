const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const emailManager = require("../../../manager/emailManager");

const resetPassword = async (req, res) => {
  const userModel = mongoose.model("users");
  const { email, new_password, reset_code } = req.body;
  if (!email) throw "Email is required";
  if (!new_password) throw "Please provide New Password";

  if (!reset_code) throw "Reset code is required";
  if (new_password.length < 5)
    throw "Password must be at least 5 character long";
  const getUserWithResetCode = await userModel.findOne({
    email: email,
    reset_code: reset_code,
  });

  if (!getUserWithResetCode) throw "Reset Code does not match!";
  const hashPassword = await bcrypt.hash(new_password, 12);

  await userModel.updateOne(
    {
      email: email,
    },
    {
      password: hashPassword,
      reset_code: "",
    },
    {
      runValidators: true,
    }
  );
  await emailManager(
    email,
    "Password Reset Successfully!",
    "Your Password Reset Successfully If you have not done that, please contact us!",
    "Your Password Reset Successfully If you have not done that, please contact us!"
  );
  res.status(200).json({
    status: true,
    message: "Password reseted successfully!",
  });
};
module.exports = resetPassword;
