const route = require('express').Router();
const BlogController = require("../Controllers/BlogController");
const CommandController = require("../Controllers/CommandController");
const authMiddleware = require("../Middleware/authMiddleware");
const UserController = require("../Controllers/UserController");

route.get("/info/:idUser", authMiddleware.verifyOwnerOrAdmin, UserController.getInfo);
route.post("/edit/:idUser", authMiddleware.verifyOwnerOrAdmin, UserController.editInfo);


route.get("/blogs/all", authMiddleware.verifyOwnerOrAdmin, BlogController.getAllBlogs);
route.get("/blogs/:idBlog", authMiddleware.verifyOwnerOrAdmin, BlogController.getDetailBlog)
route.post("/blogs/store", authMiddleware.verifyOwnerOrAdmin, BlogController.addBlog);
route.post("/blogs/edit/:idBlog", authMiddleware.verifyOwnerOrAdmin, BlogController.editBlog);
route.post("/blogs/detail/:idBlog", authMiddleware.verifyOwnerOrAdmin, BlogController.getDetailBlog);
route.post("/blogs/like/:idBlog", BlogController.increaseFavorites);
route.delete("/blogs/delete/:idBlog", authMiddleware.verifyOwnerOrAdmin, BlogController.deleteBlog);
route.get("/blogs/command/:idBlog", authMiddleware.verifyOwnerOrAdmin, CommandController.getCommand);
route.post("/command/add/:idBlog", authMiddleware.verifyOwnerOrAdmin, CommandController.addCommand);
route.delete("/command/:idCommand", authMiddleware.verifyOwnerOrAdmin, CommandController.deleteCommand);
route.post("/command/edit/:idCommand", authMiddleware.verifyOwnerOrAdmin, CommandController.editCommand);

module.exports = route;
