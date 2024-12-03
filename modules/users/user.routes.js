const express = require("express");
const register = require("./controllers/register.js");
const login = require("./controllers/login.js");
const userDashboard = require("./controllers/userDashboard.js");
const auth = require("../../middleware/auth.js");
const forgotPassword = require("./controllers/forgotPassword.js");
const resetPassword = require("./controllers/resetPassword.js");
const userRoute = express.Router();
// Routes
userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.post("/forgotPassword", forgotPassword);
userRoute.post("/resetPassword", resetPassword);
// Protected Routes...
userRoute.use(auth);
userRoute.get("/dashboard", userDashboard);

module.exports = userRoute;
