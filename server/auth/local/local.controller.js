'use strict';

// ********************* Mail ***********************
var passport = require('passport');
var jwt = require('jsonwebtoken');
var mail = require('../../mail');
var config = require('../../config/environment');
var User = require('mongoose').model('User');
var auth = require('../auth.service');
// ********************* Mail ***********************


exports.root = function(req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    var error = err || info;
    if (error) return res.json(401, error);
    if (!user) return res.json(404, {message: 'Something went wrong, please try again.'});

    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });

  })(req, res, next)
};


/**
 * Send confirmation mail
 */
 exports.sendConfirmationMail = function(req, res, next) {
  
  var user = req.user;

  var mailConfirmationToken = jwt.sign({name : user.name, email: user.email,  password: user.password }, config.secrets.mailConfirmation, {expiresInMinutes: 60 * 24 * 30});

  mail.userConfirmation.sendMail(user.name, user.email, mailConfirmationToken, function(){
    res.send(200);
  });
};

/**
 * Send coach confirmation mail
 */
 exports.sendCoachConfirmationMail = function(req, res, next) {
  
  var user = req.user;

  var mailConfirmationToken = jwt.sign({name : user.name, email: user.email,  password: user.password }, config.secrets.mailConfirmation, {expiresInMinutes: 60 * 24 * 30});

  mail.coachConfirmation.sendMail(user.name, user.email, mailConfirmationToken, function(){
    res.send(200);
  });
};

 /**
 * Confirm mail address
 */
exports.confirmMailAddress = function(req, res, next) {

  var mailConfirmationToken = req.param('mailConfirmationToken');

  jwt.verify(mailConfirmationToken, config.secrets.mailConfirmation, function(error, data) {
        
    if (error) return res.send(403);
    if (data.exp < Date.now()) return res.send(403, { message: "The validation token has expired. You should signin and ask for a new one."});

    User.findOne({email: data.email}, function(error, user){
      if (error) return res.send(403, { message: "The validation token is invalid. You should signin and ask for a new one."});
      if (!user) return res.send(403, { message: "The validation token is invalid. You should signin and ask for a new one."});

      user.confirmMail(function(){
        if (user.role === 'coach') {
          mail.adminConfirmation.sendMail(user.name, user.email, user._id, null);
        }

        var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
        res.json({ token: token });
      });
   });

  });
};