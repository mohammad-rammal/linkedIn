const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");
const Authentication = require("../authentication/auth");

// /api/auth
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/google", AuthController.loginThroughGmail);

router.post("/logout", Authentication.auth, AuthController.logout);

router.get("/self", Authentication.auth, (req, res) => {
  return res.status(200).json({ user: req.user });
});

module.exports = router;
