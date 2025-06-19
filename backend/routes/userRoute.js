const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const Authentication = require("../authentication/auth");

// /api/user
router.put("/update", Authentication.auth, UserController.updateUser);
router.get("/:id", UserController.getProfileById);

module.exports = router;
