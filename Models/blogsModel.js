const mongoose = require("mongoose");

const blogsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "blogs need title"],
  },
  content: {
    type: String,
  },
  author: {
    type: String,
  },
  timeStamp: {
    type: Date,
    default: Date.now(),
  },
});

const BlogsPost = mongoose.model("BlogsPost", blogsSchema);

module.exports = BlogsPost;
