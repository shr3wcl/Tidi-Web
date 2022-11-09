const route = require('express').Router();
const BlogController = require("../Controllers/BlogController");
const CommandController = require("../Controllers/CommandController");
const authMiddleware = require("../Middleware/authMiddleware");

route.get("/blogs", authMiddleware.verifyAccessToken, BlogController.getAllBlogs);
route.get("/blogs/:idBlog", authMiddleware.verifyAccessToken, BlogController.getDetailBlog)
route.post("/blogs/store", authMiddleware.verifyAccessToken, BlogController.addBlog);
route.post("/blogs/:idBlog/edit", authMiddleware.verifyAccessToken, BlogController.editBlog);
route.post("/:idBlog/detail", authMiddleware.verifyAccessToken, BlogController.getDetailBlog);
route.delete("/:idBlog/delete", authMiddleware.verifyAccessToken, BlogController.deleteBlog);
route.get("/:idBlog/command", authMiddleware.verifyAccessToken, CommandController.getCommand);
route.post("/:idBlog/add", authMiddleware.verifyAccessToken, CommandController.addCommand);
route.delete("/command/:idCommand", authMiddleware.verifyAccessToken, CommandController.deleteCommand);
route.post("/command/:idCommand/edit", authMiddleware.verifyAccessToken, CommandController.editCommand);

module.exports = route;
