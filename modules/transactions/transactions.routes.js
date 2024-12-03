const express = require("express");
const auth = require("../../middleware/auth.js");
const addIncome = require("./controllers/addIncome.js");
const addExpense = require("./controllers/addExpense.js");
const getTransactions = require("./controllers/getTransactions.js");
const deleteTransaction = require("../users/controllers/deleteTransaction.js");
const editTransaction = require("../users/controllers/editTransaction.js");
const transactionRoute = express.Router();
// Routes

// Protected Routes...
transactionRoute.use(auth);
transactionRoute.post("/addIncome", addIncome);
transactionRoute.post("/addExpense", addExpense);
transactionRoute.get("/transactions", getTransactions);
transactionRoute.delete("/:deleteTransaction_id", deleteTransaction);
transactionRoute.patch("/", editTransaction);

module.exports = transactionRoute;
