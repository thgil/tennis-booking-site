'use strict';

var User = require('../user/user.model');

exports.search = function(req, res, next) {
  var loc = req.query.loc;
  var radius = req.query.radius;
    
  User.find({
    loc: {$geoWithin: { $centerSphere: [ [ loc[0], loc[1] ], radius] }} 
  }, '-salt -hashedPassword -email -id -provider -random -role', function(err, users) {
    if (err) return next(err);
    if (!users) return res.json(401);
    res.json(users);
  });
};