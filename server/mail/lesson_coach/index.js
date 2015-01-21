'use strict';

var service = require('./../mail.service.js');

var sendMail = function(userName, coachName, startTime, email, mailConfirmationToken, callback){

    var user = {
    	name : userName,
    	email : email,
    };

    var locals = {
      userName: userName,
      coachName: coachName
    };

    service.sendmail('lesson_coach', user, 'Lesson booking received', locals, callback);

  };

exports.sendMail = sendMail;