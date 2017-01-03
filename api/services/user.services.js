/**
 * @file
 * Contains all function for directly interacting with database
 */
'use strict';

// Dependencies
const md5 = require('md5');
const User = require('../models/user.model');
const validations = require('../validations/user.validations');

/**
 * Registers a user in database
 * and returns a callback
 * @param {object} values
 * @param {function} callback
 */
const create = (values, callback) => {
  // Check for validation
  validations.validateCreate(values, function (error) {
    if (error) {
      callback(error);
    } else {
      // Encrypt password
      values.password = md5(values.password);

      User.create(values, callback);
    }
  });
};

/**
 * Checks a user credentials from database
 * and returns a callback
 * @param {object} values - contains username and password
 * @param {function} callback
 */
const login = (values, callback) => {
  let {
    password,
    username
  } = values;

  /**
   * Encrypt password as encrypted password
   * is stored in database
   */
  if (password) {
    password = md5(password);
  }

  var dbQuery = User.findOne({
    username,
    password
  });

  dbQuery.exec((error, user) => {
    if (error) {
      callback(error);
    } else if (!user) {
      let errorMsg = {
        message: 'Invalid username/password',
        statusCode: 400
      };
      callback(errorMsg);
    } else {
      user.password = undefined;
      callback(null, user);
    }
  });
};

// Exports
module.exports = {
  create,
  login
};