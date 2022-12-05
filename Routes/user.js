const route = require('express').Router();
const BlogController = require("../Controllers/BlogController");
const CommandController = require("../Controllers/CommandController");
const authMiddleware = require("../Middleware/authMiddleware");
const UserController = require("../Controllers/UserController");
const ProjectController = require("../Controllers/ProjectController");
const ManagerController = require("../Controllers/ManagerController");
const NoteController = require("../Controllers/NoteController");
const TodoController = require("../Controllers/TodoController");
const TaskController = require("../Controllers/TaskController");
const ScheduleController = require("../Controllers/ScheduleController");
const StorageController = require('../Controllers/StorageController');

const multer = require("multer");
const path = require("path");
const FollowController = require('../Controllers/FollowController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        console.log(file);
        console.log(1);
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage });

//Infomation
route.get("/info/:idUser", UserController.getInfo);
route.post("/edit/:idUser", authMiddleware.verifyAccessToken, UserController.editInfo);
route.post("/change/password", authMiddleware.verifyAccessToken, UserController.changePassword);
route.post("/change/avatar", UserController.changeAvatar);
// route.get("/info")

//Follow
route.get("/follow/all/:idUser", FollowController.getAllFollow);
route.post("/follow/add/:idUser", authMiddleware.verifyAccessToken, FollowController.addFollower);
route.post("/follow/delete", authMiddleware.verifyAccessToken, FollowController.deleteFollower);
route.post("/follow/check", authMiddleware.verifyAccessToken, FollowController.checkFollow);
//Blog
route.get("/blogs/all", authMiddleware.verifyAccessToken, BlogController.getOwnerAllBlogs);
route.get("/blogs/public/all", BlogController.getAllBlogPublic);
route.get("/blogs/:idBlog", BlogController.getDetailBlog)
route.post("/blogs/store", authMiddleware.verifyOwnerOrAdmin, BlogController.addBlog);
route.post("/blogs/edit/:idBlog", authMiddleware.verifyAccessToken, BlogController.editBlog);
// route.post("/blogs/detail/:idBlog", authMiddleware.verifyOwnerOrAdmin, BlogController.getDetailBlog);
route.post("/blogs/like/:idBlog", BlogController.increaseFavorites);
route.delete("/blogs/delete/:idBlog", authMiddleware.verifyAccessToken, BlogController.deleteBlog);
route.post("/blogs/search", BlogController.searchBlog);
//Comment
route.get("/blogs/comment/:idBlog", authMiddleware.verifyAccessToken, CommandController.getCommand);
route.post("/comment/add/:idBlog", authMiddleware.verifyAccessToken, CommandController.addCommand);
route.delete("/comment/:idCommand", authMiddleware.verifyAccessToken, CommandController.deleteCommand);
route.post("/comment/edit/:idCommand", authMiddleware.verifyAccessToken, CommandController.editCommand);
//Storage
route.get("/blogs/storage/all", authMiddleware.verifyAccessToken, StorageController.getAll);
route.post("/blogs/storage/add", authMiddleware.verifyAccessToken, StorageController.add);
route.delete("/blogs/storage/delete/:idBlog", authMiddleware.verifyAccessToken, StorageController.delete);
route.get("/blogs/storage/check/:idBlog", authMiddleware.verifyAccessToken, StorageController.checkEmpty);

//Project
route.post("/project/add", authMiddleware.verifyAccessToken, ProjectController.addProject);
route.delete("/project/delete/:idProject", authMiddleware.verifyAccessToken, ProjectController.deleteProject);
route.post("/project/edit/:idProject", authMiddleware.verifyAccessToken, ProjectController.editProject);
route.get("/project/all", authMiddleware.verifyAccessToken, ProjectController.getAllProject);
route.get("/project/detail/:idProject", authMiddleware.verifyAccessToken, ProjectController.getDetailProject);

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

//todo
route.get("/project/:idProject/todo/getall", authMiddleware.verifyAccessToken, TodoController.getAll);
route.post("/project/:idProject/todo/add", authMiddleware.verifyAccessToken, TodoController.addTodo);
route.delete("/project/Todo/delete/:idTodo", authMiddleware.verifyAccessToken, TodoController.deleteTodo);
route.post("/project/Todo/edit/:idTodo", authMiddleware.verifyAccessToken, TodoController.editTodo);
route.get("/project/Todo/detail/:idTodo", authMiddleware.verifyAccessToken, TodoController.getDetail);

//Task
route.get("/project/:idProject/task/getall", authMiddleware.verifyAccessToken, TaskController.getAll);
route.post("/project/:idProject/task/add", authMiddleware.verifyAccessToken, TaskController.addTask);
route.delete("/project/task/delete/:idTask", authMiddleware.verifyAccessToken, TaskController.deleteTask);
route.post("/project/task/edit/:idTask", authMiddleware.verifyAccessToken, TaskController.editTask);
route.get("/project/task/detail/:idTask", authMiddleware.verifyAccessToken, TaskController.getDetail);

//Schedule
route.get("/project/:idProject/schedule/getall", authMiddleware.verifyAccessToken, ScheduleController.getAll);
route.post("/project/:idProject/schedule/add", authMiddleware.verifyAccessToken, ScheduleController.addSchedule);
route.delete("/project/schedule/delete/:idSchedule", authMiddleware.verifyAccessToken, ScheduleController.deleteSchedule);
route.post("/project/schedule/edit/:idSchedule", authMiddleware.verifyAccessToken, ScheduleController.editSchedule);
route.get("/project/schedule/detail/:idSchedule", authMiddleware.verifyAccessToken, ScheduleController.getDetail);

module.exports = route;
