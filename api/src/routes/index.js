const express = require('express');
const routes = express.Router();
const userController = require('../controllers/index');

routes.get('/users', userController.getAll);

module.exports = routes;