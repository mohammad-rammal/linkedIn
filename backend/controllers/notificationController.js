const Notification = require("../models/notification");

/****************************************
 * @desc     Get Notifications
 * @route    GET /api/notification
 * @access   Private (Only Logged User)
 ****************************************/
exports.getNotification = async (req, res) => {
  try {
    const ownId = req.user._id;
    // console.log(ownId);e
    // console.log(req.user);

    const notifications = await Notification.find({ receiver: ownId })
      .sort({
        createAt: -1,
      })
      .populate("sender receiver");

    return res.status(200).json({
      message: "Notifications fetched successfully",
      notifications,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

/****************************************
 * @desc     Read Notification Update
 * @route    PUT /api/notification/isRead
 * @access   Private (Only Logged User)
 ****************************************/
exports.updateRead = async (req, res) => {
  try {
    const { notificationId } = req.body;
    const notification = await Notification.findByIdAndUpdate(notificationId, {
      isRead: true,
    });
    if (!notification) {
      return res.status(404).json({ error: "Notification not found!" });
    }

    return res.status(200).json({
      message: "Read notification",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

/****************************************
 * @desc     Count Notifications
 * @route    GET /api/notification/activeNotification
 * @access   Private (Only Logged User)
 ****************************************/
exports.activeNotify = async (req, res) => {
  try {
    const ownId = req.user._id;
    const notifications = await Notification.find({
      receiver: ownId,
      isRead: false,
    });

    return res.status(200).json({
      message: "Notifications number fetched successfully",
      count: notifications.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};
