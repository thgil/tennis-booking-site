'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MessageSchema = new Schema({
  to: Schema.Types.ObjectId,
  toName: String,
  from: Schema.Types.ObjectId,
  fromName: String,
  date: Date,
  message: String,
  viewed: Boolean
});

module.exports = mongoose.model('Message', MessageSchema);
