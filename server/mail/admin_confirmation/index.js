'use strict';

var service = require('./../mail.service.js');
var config = require('../../config/environment');

var sendMail = function(name, email, id, callback){

    console.log('SENDING ADMIN MAIL TO '+config.mail.adminEmail)

    var user = {
    	name : 'admin',
    	email : config.mail.adminEmail,
    };

    var locals = {
      name: name,
      CONFIRMATION_URL : process.env.DOMAIN+'/admin/',
      ID : id
    };

    service.sendmail('admin_confirmation', user, 'New Coach', locals, callback);

  };

exports.sendMail = sendMail;