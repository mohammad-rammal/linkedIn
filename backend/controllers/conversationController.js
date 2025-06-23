const Conversation = require("../models/conversation");
const Message = require("../models/message");

/****************************************
 * @desc     Add Conversation
 * @route    POST /api/conversation
 * @access   Private (Only Logged User)
 ****************************************/
exports.addConversation = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { receiverId, message } = req.body;

    let isConversationExist = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!isConversationExist) {
      const newConversation = Conversation({
        members: [senderId, receiverId],
      });
      await newConversation.save();
      const addMessage = new Message({
        sender: req.user._id,
        conversation: newConversation._id,
        message,
      });
      await addMessage.save();
    } else {
      const addMessage = new Message({
        sender: req.user._id,
        conversation: isConversationExist._id,
        message,
      });
      await addMessage.save();
    }

    return res.status(201).json({
      message: "Message sent",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

/****************************************
 * @desc     Get Conversations
 * @route    GET /api/getConversation
 * @access   Private (Only Logged User)
 ****************************************/
exports.getConversation = async (req, res) => {
  try {
    const loggedInId = req.user._id;

    const conversations = await Conversation.find({
      members: { $in: [loggedInId] },
    })
      .populate("members", "-password")
      .sort({ createAt: -1 });

    return res.status(200).json({
      message: "Fetched successfully",
      conversations,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};
