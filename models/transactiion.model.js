const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      require: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    transaction_type: {
      type: String,
      require: true,
      enum: ["income", "expense"],
    },
    remark: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const transcationModel = mongoose.model("transaction", transactionSchema);
module.exports = transcationModel;
