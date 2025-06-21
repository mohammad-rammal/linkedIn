const express = require("express");
const router = express.Router();
const NotificationController = require("../controllers/notificationController");
const Authentication = require("../authentication/auth");

// /api/notification
router.get("/", Authentication.auth, NotificationController.getNotification);
router.put("/isRead", Authentication.auth, NotificationController.updateRead);
router.get("/activeNotification", Authentication.auth, NotificationController.activeNotify);

module.exports = router;
