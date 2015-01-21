'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ReviewSchema = new Schema({
  user: Schema.Types.ObjectId,
  coach: Schema.Types.ObjectId,
  lesson: Schema.Types.ObjectId,
  comment: String,
  rating: Number,
  date: Date
});

ReviewSchema
.path('rating')
.validate(function(rating) {
  return rating.length;
}, 'Enter a rating');

// Validate lesson review is not taken
ReviewSchema
.path('lesson')
.validate(function(value, respond) {
  var self = this;
  this.constructor.findOne({lesson: value}, function(err, review) {
    if(err) throw err;
    if(review) {
      if(self.id === review.id) return respond(true);
      return respond(false);
    }
    respond(true);
  });
}, 'The specified review token has already been used.');


module.exports = mongoose.model('Review', ReviewSchema);