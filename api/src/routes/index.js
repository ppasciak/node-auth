const express = require('express');
const routes = express.Router();
const userController = require('../controllers/userControllers');
const noteController = require('../controllers/noteControllers');
const {verifyToken} = require('../middlewares/verifyToken');

routes.post('/users', userController.registerUser);
routes.post('/login', userController.loginUser);
routes.post('/logout', userController.logoutUser);
routes.post('/changePassword', verifyToken, userController.changePassword);

routes.post('/notes', verifyToken, noteController.addNote);
routes.put('/notes', verifyToken, noteController.editNote);
routes.get('/notes', verifyToken, noteController.getAllNotes);


module.exports = routes;