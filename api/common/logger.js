'use strict';

// Dependencies
const winston = require('winston');
const constants = require('../../config/constants');

// Initialisation of logger
let logger = new(winston.Logger)({
  transports: [
    new(winston.transports.Console)({
      colorize: true,
      timestamp: true,
      level: constants.LOG_LEVEL
    })
  ]
});

// Exports
module.exports = logger;