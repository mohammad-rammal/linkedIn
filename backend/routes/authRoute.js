const express = require("express");
const router = express.Router();
const UserController = require("../controllers/authController");
const { auth } = require("../authentication/auth");

// /api/auth
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/google", UserController.loginThroughGmail);

router.get("/self", auth, (req, res) => {
  return res.status(200).json({ user: req.user });
});

module.exports = router;
