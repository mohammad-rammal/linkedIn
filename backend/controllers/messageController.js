const Message = require("../models/message");

/****************************************
 * @desc     Send Message
 * @route    POST /api/message
 * @access   Private (Only Logged User)
 ****************************************/
exports.sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { conversation, message, picture } = req.body;

    let addMessage = await Message({
      sender: req.user._id,
      conversation,
      message,
      picture,
    });
    await addMessage.save();

    let populateMessage = await addMessage.populate("sender");

    return res.status(201).json({
      populateMessage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

/****************************************
 * @desc     Get Message
 * @route    GET /api/message/:conversationId
 * @access   Private (Only Logged User)
 ****************************************/
exports.getMessage = async (req, res) => {
  try {
    const { conversationId } = req.params;

    let message = await Message.find({
      conversation: conversationId,
    }).populate("sender");

    return res.status(200).json({
      message: "Fetched message successfully",
      message,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};
