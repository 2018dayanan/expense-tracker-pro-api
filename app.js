require("express-async-errors");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const errorHandler = require("./handlers/errorHandlers");
const userRoute = require("./modules/users/user.routes.js");
const transactionRoute = require("./modules/transactions/transactions.routes.js");
const app = express();
app.use(cors());

app.use(express.json());
// Routes
app.use("/api/users", userRoute);
app.use("/api/transactions", transactionRoute);
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: false,
    message: "Not found!",
  });
});
// End of all routes....
app.use(errorHandler);

// Database Connection
mongoose
  .connect(process.env.mongo_connection, {})
  .then(() => {
    console.log("Connected to mongodb Database");
  })
  .catch(() => {
    console.log("Faild to Connect mongodb database");
  });

//   Models Initilazation
require("./models/user.model.js");
require("./models/transactiion.model.js");
app.listen(8000, () => {
  console.log("Server Started Successfully!");
});


