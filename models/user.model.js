const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Name is Required"],
    },
    email: {
      type: String,
      require: [true, "Email is Required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
    },
    balance: {
      type: Number,
      require: [true, "Balance is Required"],
      default: 0,
    },
    reset_code: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
