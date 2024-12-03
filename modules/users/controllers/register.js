const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtManager = require("../../../manager/jwtManager");
const emailManager = require("../../../manager/emailManager");
const register = async (req, res) => {
  const userModel = mongoose.model("users");

  const { name, email, password, confirm_password, balance } = req.body;

  if (!name) throw "Name must be provided";
  if (!email) throw "Email must be provided";
  if (!password) throw "Password must be provided";
  if (password.length < 5) throw "Password must be at least 5 characters logn";
  if (password !== confirm_password)
    throw "Password and Confirm password doesnot match";

  const dublicateEmail = await userModel.findOne({ email: email });

  if (dublicateEmail) throw "Email Alreay Exits";
  const hashPassword = await bcrypt.hash(password, 12);
  const createUser = await userModel.create({
    name: name,
    email: email,
    password: hashPassword,
    balance: balance,
  });

  await emailManager(
    createUser.email,
    "Welcome to expense tracker pro",
    "Welcome to expense tracker pro",
    "Welcome to expense tracker pro"
  );

  res.status(201).json({
    status: "User Register Successfully",
  });
};
module.exports = register;
