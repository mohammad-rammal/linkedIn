const express = require("express");
const route = express.Router();
const UserController = require("../controllers/authController");

// /api/auth
route.post("/register", UserController.register);
route.post("/login", UserController.login);
route.post("/google", UserController.loginThroughGmail);

module.exports = route;
