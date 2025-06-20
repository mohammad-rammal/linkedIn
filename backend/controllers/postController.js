const Post = require("../models/post");

/****************************************
 * @desc     Create New Post
 * @route    POST /api/post
 * @access   Private (Only Logged User)
 ****************************************/
exports.addPost = async (req, res) => {
  try {
    const { description, imageLink } = req.body;
    const userId = req.user._id;

    const addPost = new Post({ user: userId, description, imageLink });
    if (!addPost) {
      return res.status(400).json({ error: "Something went wrong!" });
    }

    await addPost.save();
    res.status(200).json({
      message: "Post successfully created",
      post: addPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

/****************************************
 * @desc     Create Post
 * @route    POST /api/post/likeDislike
 * @access   Private (Only Logged User)
 ****************************************/
exports.likeDislikePost = async (req, res) => {
  try {
    const userId = req.user._id;
    const { postId } = req.body;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(400).json({ error: "No such post found!" });
    }

    const index = post.likes.findIndex((id) => id.equals(userId));
    if (index !== -1) {
      // User already liked the post, remove it
      post.likes.splice(index, 1);
    } else {
      // User has not liked the post, add like
      post.likes.push(userId);
    }

    await post.save();
    res.status(200).json({
      message: index !== -1 ? "Post unlike" : "Post liked",
      liked: post.likes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

/****************************************
 * @desc     Get All Posts
 * @route    POST /api/post/getAllPost
 * @access   Public
 ****************************************/
exports.getAllPost = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createAt: -1 })
      .populate("user", "-password");

    res.status(200).json({
      message: "Fetched Data",
      length: posts.length,
      post: posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

/****************************************
 * @desc     Get Single Post By ID
 * @route    POST /api/post/getPostById/:postId
 * @access   Public
 ****************************************/
exports.getPostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId).populate("user", "-password");
    if (!post) {
      return res.status(400).json({ error: "No such post found!" });
    }

    res.status(200).json({
      message: "Fetched Data",
      post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

/****************************************
 * @desc     Get Top 5 Posts By User
 * @route    POST /api/post/getTop5Post/:userId
 * @access   Public
 ****************************************/
exports.getTop5PostForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ user: userId })
      .sort({ createAt: -1 })
      .populate("user", "-password")
      .limit(5);
    if (!posts) {
      return res.status(400).json({ error: "No such post found!" });
    }

    res.status(200).json({
      message: "Fetched Data",
      post: posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

/****************************************
 * @desc     Get All Posts For User
 * @route    POST /api/post/getAllPostForUser/:userId
 * @access   Public
 ****************************************/
exports.getAllPostForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ user: userId })
      .sort({ createAt: -1 })
      .populate("user", "-password");

    if (!posts) {
      return res.status(400).json({ error: "No such post found!" });
    }

    res.status(200).json({
      message: "Fetched Data",
      post: posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};
