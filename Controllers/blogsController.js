const BlogsPost = require("../Models/blogsModel");
const AppError = require("../Utils/appError");
const catchAsync = require("../Utils/catchAsync");

// Get All posts

const getPost = catchAsync(async (req, res, next) => {
  const getAllBlogs = await BlogsPost.find();
  console.log(req.user);
  console.log("get All post");
  res.status(200).json({
    status: "success",
    data: getAllBlogs,
  });
});

//Create posts
const createNewBlogs = catchAsync(async (req, res, next) => {
  const { title, content } = req.body;
  const author = req.user.name;
  const newPost = { title, content, author };

  const newBlogs = await BlogsPost.create(newPost);
  res.status(201).json({
    status: "success",
    data: newBlogs,
  });

  next();
});
// update post
const updatePost = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  // Get post from Id
  console.log("user", req.user);
  const post = await BlogsPost.findById(id);
  console.log("post", post);
  if (!post) next(new AppError("Invalid post id ", 400));
  if (req.user.name === post.author) {
    const updatedPost = await BlogsPost.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(203).json({
      status: "success",
      data: updatedPost,
      message: "Updated post Successfully",
    });
  } else {
    return next(new AppError("You don't have access to update this post", 401));
  }
});

//delete post
const deletePost = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  // Get post from Id
  console.log("user", req.user);
  const post = await BlogsPost.findById(id);
  if (!post) return next(new AppError("unable to fetch post", 400));
  if (req.user.name === post.author || req.user.role === "admin") {
    const deletedPost = await BlogsPost.findByIdAndDelete(id);
    res.status(203).json({
      status: "success",
      message: "delete successfully",
    });
  } else {
    return next(new AppError("You don't have access to update this posy", 401));
  }
  next();
});

module.exports = { getPost, createNewBlogs, updatePost, deletePost };
