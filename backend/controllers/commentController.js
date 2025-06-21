const Comment = require("../models/comment");
const Post = require("../models/post");
const Notification = require("../models/notification");

/****************************************
 * @desc     Write Comment
 * @route    POST /api/comment
 * @access   Private (Only Logged User)
 ****************************************/
exports.commentPost = async (req, res) => {
  try {
    const { postId, comment } = req.body;
    const userId = req.user._id;

    const postExist = await Post.findById(postId).populate("user");
    if (!postExist) {
      return res.status(404).json({ error: "No such post found!" });
    }
    postExist.comments = postExist.comments + 1;
    await postExist.save();

    const newComment = await Comment({ user: userId, post: postId, comment });
    await newComment.save();

    const populateComment = await Comment.findById(newComment._id).populate(
      "user",
      "fullName headline profilePicture"
    );

    const content = `${req.user.fullName} has commented on your post.`;
    const notification = new Notification({
      sender: userId,
      receiver: postExist.user._id,
      content,
      type: "comment",
      postId: postId.toString(),
    });
    await notification.save();

    return res.status(200).json({
      message: "Commented successfully",
      comment: populateComment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

/****************************************
 * @desc     Get Comment By PostId
 * @route    GET /api/comment/:postId
 * @access   Public
 ****************************************/
exports.getCommentByPostId = async (req, res) => {
  try {
    const { postId } = req.params;

    const isPostExist = await Post.findById(postId);
    if (!isPostExist) {
      return res.status(400).json({ error: "No such post found!" });
    }

    const comments = await Comment.find({ post: postId })
      .sort({ createAt: -1 })
      .populate("user", "fullName headline profilePicture");

    return res.status(201).json({
      message: "Comments successfully",
      count: comments.length,
      comment: comments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};
