'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LessonSchema = new Schema({
  coach: String,
  name: String,
  info: String,
  date: Date,
  startTime: Number,
  endTime: Number
});

module.exports = mongoose.model('Lesson', LessonSchema);