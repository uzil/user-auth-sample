'use strict';

// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema Defination
const schema = new Schema({
  firstname: String,
  lastname: String,
  email: {
    type: String,
    unique: true
  },
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    select: false, //by default password won't be sent in find query
    default: ''
  }
}, {
  toObject: {
    transform: transformDocument
  },
  toJSON: {
    transform: transformDocument
  }
});

/**
 * Transform mongoose response object - Removes _id, __V and add id
 * @return {string} transformed object
 */
function transformDocument(doc, ret) {
  ret.id = ret._id;

  delete ret._id;
  delete ret.__v;
}

// Define model for schema
const Model = mongoose.model('user', schema);

// Exports
module.exports = Model;