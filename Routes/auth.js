const route = require('express').Router();
const AuthController = require("../Controllers/AuthController");
const authMiddleware = require("../Middleware/authMiddleware");

route.post('/register', AuthController.register);
route.post('/login', AuthController.login);
route.post('/logout', authMiddleware.verifyAccessToken, AuthController.logout);
route.post('/refresh', AuthController.requestRefreshToken);

module.exports = route;
