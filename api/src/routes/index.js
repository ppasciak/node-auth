const express = require('express');
const routes = express.Router();
const userController = require('../controllers/index');
const {verifyToken} = require('../middlewares/verifyToken');

routes.post('/users', userController.registerUser);
routes.post('/login', userController.loginUser);
routes.post('/logout', userController.logoutUser);
routes.post('/changePassword', verifyToken, userController.changePassword);

module.exports = routes;