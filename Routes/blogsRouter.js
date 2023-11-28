const express = require("express");
const blogsRoutes = express.Router();

const {
  getPost,
  createNewBlogs,
  updatePost,
  deletePost,
} = require("../Controllers/blogsController");
const { protectRoute } = require("../Controllers/userAuthController");

blogsRoutes
  .get("/post", getPost)
  .post("/post", protectRoute, createNewBlogs)
  .patch("/post/:id", protectRoute, updatePost)
  .delete("/post/:id", protectRoute, deletePost);

module.exports = blogsRoutes;
