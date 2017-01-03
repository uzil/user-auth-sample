'use strict';

// Dependencies
const Router = require('express').Router();
const userController = require('../controllers/user.controller');

// Routes
Router.post('/register', userController.register);
Router.post('/login', userController.login);

// Exports
module.exports = Router;