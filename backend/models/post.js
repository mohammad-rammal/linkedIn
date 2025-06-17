const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    description: {
      type: String,
    },
    imageLink: {
      type: String,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    comments: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const PostModel = mongoose.model("post", postSchema);

module.exports = PostModel;
