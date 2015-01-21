'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var mail = require('../../mail');

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
* Creates a User
*/
exports.createUser = function(req, res, next) {
    
  var email = req.body.email;
  var name = req.body.name;
  
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);

    var mailConfirmationToken = jwt.sign({name : name, email: email},
      config.secrets.mailConfirmation,
      {expiresInMinutes: 60 * 24 * 30});
      
    mail.userConfirmation.sendMail(name, email, mailConfirmationToken, null);
    
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

/**
 * Creates a new coach
 */
exports.createCoach = function (req, res, next) {

  var email = req.body.email;
  var name = req.body.name;

  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'coach';
  
  // Probably should be done in the model.js somewhere
  newUser.url = newUser.makeUrl(newUser.name);

  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    
    var mailConfirmationToken = jwt.sign({name : name, email: email},
      config.secrets.mailConfirmation,
      {expiresInMinutes: 60 * 24 * 30});

    mail.coachConfirmation.sendMail(name, email, mailConfirmationToken, null);
    
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

/**
* Confirms email for any user
*/
exports.confirmEmail = function(req, res, next) {  
  var mailConfirmationToken = req.param('mailConfirmationToken');

  jwt.verify(mailConfirmationToken, config.secrets.mailConfirmation, function(error, data) {

    if (error) return res.send(403);

    if (data.exp < Date.now()) return res.send(403);

    User.findOne({email: data.email}, function(error, user){
      if (error) return res.send(403);
      if (!user) return res.send(403);

      user.confirmedEmail = true;
    
      user.save(function(err, user) {
        if (err) return validationError(res, err);
        
        if (user.role === 'coach') {
          mail.adminConfirmation.sendMail(user.name, user.email, user._id, null);
        }
        
        var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
        res.json({ token: token });
      });
    });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
* Change a users profile
*/
exports.changeProfile = function(req, res, next) {
  var userId = req.user._id;
  var profile = req.body.profile;
  
  User.findById(userId, function (err, user) {
    user.for = profile.for;
    user.count = profile.count;
    user.age = profile.age;
    user.exp = profile.exp;
    
    user.save(function(err) {
      if (err) return validationError(res, err);
      res.send(200);
    });
  });
};

/**
 * Gets a list of coaches
 */
exports.getCoaches = function(req, res, next) {  
  User.find({
    role:"coach"
  }, '-salt -hashedPassword', function (err, user) {
    if (err) return next(err);
    res.json(user);
  });
};


/**
 * Gets a coach by id
 */
exports.showCoach = function(req, res, next) {
  var userId = req.params.id;

  User.findOne({
    url: userId,
    role: 'coach'
  }, '-salt -hashedPassword', function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(404);
    res.json(user);
  });
};

/**
 * Change a coaches about info
 */
exports.changeAbout = function(req, res, next) {
  var userId = req.user._id;
  var about = String(req.body.about);

  User.findById(userId, function (err, user) {
    user.about = about;
    user.save(function(err) {
      if (err) return validationError(res, err);
      res.send(200);
    });
  });
};

exports.changeAvailability = function(req, res, next) {
  var userId = req.user._id;
  var availability = req.body.availability;

  User.findById(userId, function (err, user) {
    user.availableTimes = availability;
    user.save(function(err) {
      if (err) return validationError(res, err);
      if (!user) return res.json(401);
      res.send(200);
    });
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword -random -provider', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

exports.getFeatured = function(req, res, next) {
  User.findRandom({role:'coach'},
  '-salt -hashedPassword -email -about -id -provider -random -role').limit(4).exec(function (err, users) {
    if (err) return next(err);
    if (!users) return res.json(401);
    res.json(200, users);
  });
};

exports.confirmCoach = function(req, res, next) {
  var userId = req.params.id;
  var confirmedCoach = req.body.confirmedCoach;
    
  User.findById(userId, function (err, user) {
    user.confirmedCoach = confirmedCoach;
    user.save(function(err) {
      if (err) return validationError(res, err);
      res.send(200);
    });
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
