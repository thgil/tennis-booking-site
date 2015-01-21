'use strict';

var _ = require('lodash');
var config = require('../../config/environment');
var Review = require('./review.model');
var jwt = require('jsonwebtoken');
var Lesson = require('../lesson/lesson.model')

// Get list of reviews
exports.index = function(req, res) {
  Review.find(function (err, reviews) {
    if(err) { return handleError(res, err); }
    return res.json(200, reviews);
  });
};

// Get a single review
exports.show = function(req, res) {
  Review.findById(req.params.id, function (err, review) {
    if(err) { return handleError(res, err); }
    if(!review) { return res.send(404); }
    return res.json(review);
  });
};

// Creates a new review in the DB.
exports.create = function(req, res) {
  Review.create(req.body, function(err, review) {
    if(err) { return handleError(res, err); }
    return res.json(201, review);
  });
};

// Updates an existing review in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Review.findById(req.params.id, function (err, review) {
    if (err) { return handleError(res, err); }
    if(!review) { return res.send(404); }
    var updated = _.merge(review, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, review);
    });
  });
};

// Creates a new review in the DB.
exports.submitReview = function(req, res) {
  
  jwt.verify(req.params.id, config.secrets.reviewConfirmation, function(error, data) {
    if (error) return handleError(res, error);
    if (data.exp < Date.now()) return res.send(403);
        
    console.log(data);
    
    Lesson.findById(data.lesson_id, function(err, lesson){
      console.log(lesson)
      
      if(err) return handleError(res, err);
      if(!lesson) return res.send(403);
      
      console.log('lesson found');
      
      Review.create({
        user: lesson.user,
        coach: lesson.coach,
        lesson: lesson._id,
        comment: req.body.comment,
        rating: req.body.rating
      }, function(err, review){
        if(err) { return handleError(res, err); }
        
        console.log('review made');
        
        return res.send(201);
      });
    })
  });
};

// Deletes a review from the DB.
exports.destroy = function(req, res) {
  Review.findById(req.params.id, function (err, review) {
    if(err) { return handleError(res, err); }
    if(!review) { return res.send(404); }
    review.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}