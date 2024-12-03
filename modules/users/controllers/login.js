const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const jwtManager = require("../../../manager/jwtManager");

const login = async (req, res) => {
  const userModel = mongoose.model("users");
  const { email, password } = req.body;

  const getUser = await userModel.findOne({ email: email });

  if (!getUser) throw "This Email doesnot exit in the system!";

  const comparePassword = await bcrypt.compare(password, getUser.password);
  if (!comparePassword) throw "Email and password do not match";

  const accessToken = jwtManager(getUser);

  // Success response
  res.status(200).json({
    status: "true",
    message: "User logged in successfully!",
    accessToken: accessToken,
  });
};

module.exports = login;
