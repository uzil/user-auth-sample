'use strict';

// Dependencies
const jwt = require('jsonwebtoken');
const constants = require('../config/constants');

/**
 * Generates a token
 * @param {object} payload
 * @return {string} token
 */
const generateToken = (payload) => {
  let token = jwt.sign(payload, constants.SECRET, {
    expiresIn: constants.TOKEN_EXPIRES_IN
  });

  return token;
};

const verifyToken = (token, callback) => {
  jwt.verify(token, constants.SECRET, callback);
};

/**
 * Format an error object to remove unnecessary details
 * @param {object} error
 * @return {object} concise error
 */
const formatError = (error) => {
  if (error.isJoi) {
    return formatJoiError(error);
  } else if (error.code) {
    return formatMongooseError(error);
  } else return error;
};

/**
 * Format joi error object to remove unnecessary details
 * @param {object} error
 * @return {object} concise error
 */
function formatJoiError(error) {
  let formattedError = {};

  formattedError.statusCode = 400;
  formattedError.name = error.name;
  formattedError.message = error.details[0].message;

  return formattedError;
};

/**
 * Format joi error object to remove unnecessary details
 * @param {object} error
 * @return {object} concise error
 */
function formatMongooseError(error) {
  let formattedError = {};

  formattedError.statusCode = 400;
  
  if (error.code === 11000) {
    let duplicateMsgArr = error.errmsg.split('\"');
    formattedError.message = duplicateMsgArr[1] + ' is already registered';

    return formattedError;
  }
  return error.errmsg;
}

// Exports
module.exports = {
  generateToken,
  verifyToken,
  formatError
};