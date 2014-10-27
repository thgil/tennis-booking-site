'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LessonSchema = new Schema({
  coach: String,
  student: String,
  for: String,
  count: Number,
  age: String,
  exp: String,
  startTime: Date,
  endTime: Date
});

module.exports = mongoose.model('Lesson', LessonSchema);