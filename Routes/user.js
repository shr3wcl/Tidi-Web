const route = require('express').Router();
const BlogController = require("../Controllers/BlogController");
const CommandController = require("../Controllers/CommandController");
const authMiddleware = require("../Middleware/authMiddleware");

route.get("/blogs/all", authMiddleware.verifyAccessToken, BlogController.getAllBlogs);
route.get("/blogs/:idBlog", authMiddleware.verifyAccessToken, BlogController.getDetailBlog)
route.post("/blogs/store", authMiddleware.verifyAccessToken, BlogController.addBlog);
route.post("/blogs/:idBlog/edit", authMiddleware.verifyAccessToken, BlogController.editBlog);
route.post("/blogs/:idBlog/detail", authMiddleware.verifyAccessToken, BlogController.getDetailBlog);
route.post("/blogs/:idBlog/like", BlogController.increaseFavorites);
route.delete("/blogs/:idBlog/delete", authMiddleware.verifyAccessToken, BlogController.deleteBlog);
route.get("/blogs/:idBlog/command", authMiddleware.verifyAccessToken, CommandController.getCommand);
route.post("/command/:idBlog/add", authMiddleware.verifyAccessToken, CommandController.addCommand);
route.delete("/command/:idCommand", authMiddleware.verifyAccessToken, CommandController.deleteCommand);
route.post("/command/:idCommand/edit", authMiddleware.verifyAccessToken, CommandController.editCommand);

module.exports = route;
