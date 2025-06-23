const express = require("express");
const router = express.Router();
const ConversationController = require("../controllers/conversationController");
const Authentication = require("../authentication/auth");

// /api/conversation
router.post("/add-conversation", Authentication.auth, ConversationController.addConversation); 
router.get("/get-conversation", Authentication.auth, ConversationController.getConversation); 

module.exports = router;
