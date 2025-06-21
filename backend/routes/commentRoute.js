const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/commentController");
const Authentication = require("../authentication/auth");

// /api/comment
router.post("/", Authentication.auth, CommentController.commentPost);
router.get("/:postId", CommentController.getCommentByPostId);

module.exports = router;
