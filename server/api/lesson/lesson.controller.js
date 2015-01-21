'use strict';

var _ = require('lodash');
var Lesson = require('./lesson.model');
var User = require('../user/user.model');
var mail = require('../../mail');

// Get list of lessons
exports.index = function(req, res) {
  Lesson.find(function (err, lessons) {
    if(err) { return handleError(res, err); }
    return res.json(200, lessons);
  });
};

// Get a list of lesson
exports.show = function(req, res) {
  Lesson.find({coach:req.params.id}, function (err, lesson) {
    if(err) { return handleError(res, err); }
    if(!lesson) { return res.send(404); }
    return res.json(lesson);
  });
};

// Creates a new lesson in the DB.
exports.create = function(req, res) {
  
  var lesson = req.body;
  
  // Check user and coach exist before making the lesson
  
  User.findById(lesson.coach, function(err, coach){
    if(err) { return handleError(res, err); }
    if(!coach) { return res.send(403); }
    
    User.findById(lesson.user, function(err, user){
      if(err) { return handleError(res, err); }
      if(!user) { return res.send(403); }
      
      Lesson.create({
        coach: coach._id,
        coachName: coach.name,
        user: user._id,
        bookDate: new Date(),
        for: lesson.for,
        count: lesson.count,
        age: lesson.age,
        exp: lesson.exp,
        startTime: lesson.startTime,
        endTime: lesson.endTime
      }, function(err, lesson) {
        if(err) { return handleError(res, err); }
        
        mail.lessonCoach.sendMail(user.name, coach.name, lesson.startTime, coach.email, null);
        mail.lessonUser.sendMail(user.name, coach.name, lesson.startTime, user.email, null);
        
        return res.json(201, lesson);
      });
      
    });
  });
};

// Updates an existing lesson in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Lesson.findById(req.params.id, function (err, lesson) {
    if (err) { return handleError(res, err); }
    if(!lesson) { return res.send(404); }
    var updated = _.merge(lesson, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, lesson);
    });
  });
};

// Deletes a lesson from the DB.
exports.destroy = function(req, res) {
  Lesson.findById(req.params.id, function (err, lesson) {
    if(err) { return handleError(res, err); }
    if(!lesson) { return res.send(404); }
    lesson.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

/**
 * Get my lessons
 */
exports.mylessons = function(req, res, next) {
  var userId = req.user._id;
  User.find({
    _id: userId
  }, function(err, lessons) {
    if (err) return next(err);
    if (!lessons) return res.json(401);
    res.json(lessons);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}