const express = require("express");
const router = express.Router();
const MessageController = require("../controllers/messageController");
const Authentication = require("../authentication/auth");

// /api/message
router.post("/", Authentication.auth, MessageController.sendMessage);  
router.get("/:conversationId", Authentication.auth, MessageController.getMessage);  

module.exports = router;
