const express = require("express");
const router = express.Router();
const PostController = require("../controllers/postController");
const Authentication = require("../authentication/auth");

// /api/post
router.post("/", Authentication.auth, PostController.addPost);
router.post(
  "/likeDislike",
  Authentication.auth,
  PostController.likeDislikePost
);
router.get("/getAllPost", PostController.getAllPost);
router.get("/getPostById/:postId", PostController.getPostById);
router.get("/getTop5Post/:userId", PostController.getTop5PostForUser);
router.get("/getAllPostForUser/:userId", PostController.getAllPostForUser);

module.exports = router;
