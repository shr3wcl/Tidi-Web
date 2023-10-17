const route = require('express').Router();
const AdminController = require("../Controllers/AdminController");
const authMiddleware = require("../Middleware/authMiddleware");
const BlogController = require("../Controllers/BlogController");

route.get("/user", authMiddleware.verifyAdmin, AdminController.getAllUser);
route.get("/blogs", authMiddleware.verifyAdmin, BlogController.getAllBlogAdmin);

module.exports = route;
