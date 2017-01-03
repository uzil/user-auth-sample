'use strict';

// Dependencies
var Joi = require('joi');

// Joi validation Schema Defination
var creationSchema = {
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email().regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).label('should be proprer email format'),
  firstname: Joi.string(),
  lastname: Joi.string()
};

/**
 * Validates against a data object creationSchema
 * and returns a callback
 * @param {object} dataSet
 */
var validateCreation = function (dataSet, callback) {
  Joi.validate(dataSet, creationSchema, callback);
};

// Exports
module.exports = {
  validateCreate: validateCreation
};