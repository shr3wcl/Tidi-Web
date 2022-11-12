const route = require('express').Router();
const BlogController = require("../Controllers/BlogController");
const CommandController = require("../Controllers/CommandController");
const authMiddleware = require("../Middleware/authMiddleware");
const UserController = require("../Controllers/UserController");
const ProjectController = require("../Controllers/ProjectController");
const ManagerController = require("../Controllers/ManagerController");
const NoteController = require("../Controllers/NoteController");

//Infomation
route.get("/info/:idUser", authMiddleware.verifyOwnerOrAdmin, UserController.getInfo);
route.post("/edit/:idUser", authMiddleware.verifyOwnerOrAdmin, UserController.editInfo);

//Blog
route.get("/blogs/all", authMiddleware.verifyOwnerOrAdmin, BlogController.getAllBlogs);
route.get("/blogs/:idBlog", authMiddleware.verifyOwnerOrAdmin, BlogController.getDetailBlog)
route.post("/blogs/store", authMiddleware.verifyOwnerOrAdmin, BlogController.addBlog);
route.post("/blogs/edit/:idBlog", authMiddleware.verifyOwnerOrAdmin, BlogController.editBlog);
// route.post("/blogs/detail/:idBlog", authMiddleware.verifyOwnerOrAdmin, BlogController.getDetailBlog);
route.post("/blogs/like/:idBlog", BlogController.increaseFavorites);
route.delete("/blogs/delete/:idBlog", authMiddleware.verifyOwnerOrAdmin, BlogController.deleteBlog);
route.post("/blogs/search", BlogController.searchBlog);
//Command
route.get("/blogs/command/:idBlog", authMiddleware.verifyOwnerOrAdmin, CommandController.getCommand);
route.post("/command/add/:idBlog", authMiddleware.verifyOwnerOrAdmin, CommandController.addCommand);
route.delete("/command/:idCommand", authMiddleware.verifyOwnerOrAdmin, CommandController.deleteCommand);
route.post("/command/edit/:idCommand", authMiddleware.verifyOwnerOrAdmin, CommandController.editCommand);


//Project
route.post("/project/add", authMiddleware.verifyAccessToken, ProjectController.addProject);
route.delete("/project/delete/:idProject", authMiddleware.verifyAccessToken, ProjectController.deleteProject);
route.post("/project/edit/:idProject", authMiddleware.verifyAccessToken, ProjectController.editProject);
route.get("/project/all", authMiddleware.verifyAccessToken, ProjectController.getAllProject);

//Manager
route.post("/manager/add/:idProject", authMiddleware.verifyOwnerOrAdmin, ManagerController.addMember);
route.delete("/manager/delete/:idProject", authMiddleware.verifyOwnerOrAdmin, ManagerController.deleteMember);
route.post("/manager/edit/:idProject", authMiddleware.verifyOwnerOrAdmin, ManagerController.editRoleMember);
route.get("/manager/member/:idProject", authMiddleware.verifyOwnerOrAdmin, ManagerController.getAllMember);

//Note
route.get("/project/:idProject/note/getall", authMiddleware.verifyAccessToken, NoteController.getAllNote);
route.post("/project/:idProject/note/add", authMiddleware.verifyAccessToken, NoteController.addNote);
route.delete("/project/note/delete/:idNote", authMiddleware.verifyAccessToken, NoteController.deleteNote);
route.post("/project/note/edit/:idNote", authMiddleware.verifyAccessToken, NoteController.editNote);
route.get("/project/note/detail/:idNote", authMiddleware.verifyAccessToken, NoteController.getDetail);

module.exports = route;
