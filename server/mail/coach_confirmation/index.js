'use strict';

var service = require('./../mail.service.js');

var sendMail = function(name, email, mailConfirmationToken, callback){

    var user = {
    	name : name,
    	email : email,
    };

    var locals = {
      name:user.name,
      COMPANY: 'Justbookeh',
      CONFIRMATION_URL : process.env.DOMAIN+'/coachconfirm/',
      MAIL_CONFIRMATION_TOKEN : mailConfirmationToken 
    };

    service.sendmail('coach_confirmation', user, 'Activation', locals, callback);

  };

exports.sendMail = sendMail;