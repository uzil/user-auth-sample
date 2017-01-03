'use strict';

module.exports = {
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost/sampledb',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  PORT: process.env.PORT || 3000,
  SECRET: process.env.SECRET || 'myLittleSecret',
  TOKEN_EXPIRES_IN: process.env.TOKEN_EXPIRES_IN || '2h'
};