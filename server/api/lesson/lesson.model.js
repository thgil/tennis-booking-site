'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LessonSchema = new Schema({
  coach: Schema.Types.ObjectId,
  coachName: String,
  user: Schema.Types.ObjectId,
  bookDate: Date,
  // type: String,
  for: String,
  count: Number,
  age: String,
  exp: String,
  startTime: Date,
  endTime: Date,
  confirmed: Boolean,
  // review stuff
  sent_review: { type:Boolean, default: false },
  reviewed: Boolean,
  review: Schema.Types.ObjectId
});

module.exports = mongoose.model('Lesson', LessonSchema);