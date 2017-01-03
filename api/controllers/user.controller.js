'use strict';

// Dependencies
const userService = require('../services/user.services');
const logger = require('../common/logger');
const { generateToken, formatError } = require('../utils');

const register = (req, res, next) => {
  userService.create(req.body, (error) => {
    if (error) {
      next(error);
    } else {
      res.status(201).json({
        message: 'A verification mail has been sent to your registered mail.'
      });
    }
  });
};

const login = (req, res, next) => {
  userService.login(req.body, (error, user) => {
    if (error) {
      next(error);
    } else {
      let payload = {
        userId: user.id
      };

      let token = generateToken(payload);

      res.json({
        token,
        user
      });
    }
  });
};

module.exports = {
  register,
  login
};