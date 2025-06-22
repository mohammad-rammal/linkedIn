const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const Authentication = require("../authentication/auth");

// /api/user
router.get("/findUser", Authentication.auth, UserController.findUser);
router.post(
  "/sendFriendRequest",
  Authentication.auth,
  UserController.sendFriendRequest
);
router.post(
  "/acceptFriendRequest",
  Authentication.auth,
  UserController.acceptFriendRequest
);
router.get("/friendsList", Authentication.auth, UserController.getFriendsList);
router.get("/pendingFriendsList", Authentication.auth, UserController.getPendingFriendsList);
router.delete("/removeFromFriendList/:friendId", Authentication.auth, UserController.removeFromFriend);

router.put("/update", Authentication.auth, UserController.updateUser);
router.get("/:id", UserController.getProfileById);

module.exports = router;
