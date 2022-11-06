const route = require('express').Router();
const BlogController = require("../Controllers/BlogController");
const authMiddleware = require("../Middleware/authMiddleware");

route.get("/blogs", authMiddleware.verifyAccessToken, BlogController.getAllBlogs);
route.post("/store", authMiddleware.verifyAccessToken, BlogController.addBlog);

module.exports = route;
