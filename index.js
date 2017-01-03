'use strict';

// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const constants = require('./config/constants');
const userRoutes = require('./api/routes/user.routes');
const logger = require('./api/common/logger');
const { formatError } = require('./api/utils');

// Initialisation of application
const app = express();

app.use(bodyParser.json());
app.use('/user', userRoutes);

app.use((error, req, res, next) => {
  logger.debug(error);
  
  error = formatError(error);
  
  logger.info(error);
  
  let status = error.statusCode || 500;
  
  if(status === 500) {
    logger.error('Error catched by error handler', error);
  }
  
  res.status(status).json({error});
});

/**
 * Try to connnect to the database if successfully
 * start the node server else log in console and exit
 */
mongoose.connect(constants.MONGO_URL, (error) => {
  if (error) {
    logger.error('Cannot connnect to mongoDB');
    process.exit();
  } else app.listen(constants.PORT, (error) => {
    if (error) {
      logger.error('Cannot start express server at port ' + constants.PORT);
      process.exit();
    } else logger.info('server successfully started at ', constants.PORT);
  });
});

// Exports
module.exports = app;