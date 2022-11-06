const route = require('express').Router();
const AdminController = require("../Controllers/AdminController");
const authMiddleware = require("../Middleware/authMiddleware");

route.get("/user", authMiddleware.verifyAdmin, AdminController.getAllUser);

module.exports = route;
