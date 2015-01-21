'use strict';

var service = require('./../mail.service.js');

var sendMail = function(userName, coachName, email, reviewToken, callback){

    var user = {
    	name : userName,
    	email : email,
    };
    
    var locals = {
      userName: userName,
      coachName: coachName,
      reviewToken: reviewToken,
      reviewUrl: process.env.DOMAIN+'/review/'
    };
    
    service.sendmail('lesson_review', user, 'Review your lesson!', locals, callback);
};

exports.sendMail = sendMail;