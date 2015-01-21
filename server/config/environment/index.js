'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Should we populate the DB with sample data?
  seedDB: true,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: process.env.SESSION_SECRET || 'angular-fullstack-secret',
    mailConfirmation : process.env.MAIL_CONFIRMATION_SECRET || 'mailConfirmation',
    reviewConfirmation : process.env.MAIL_CONFIRMATION_SECRET || 'mailConfirmation',
    passwordReset: process.env.PASSWORD_RESET_SECRET || 'passwordReset'
  },

  // List of user roles
  userRoles: ['user', 'coach', 'admin'],

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },
  
  mail: { //transport: process.env.MAIL_TRANSPORT_METHOD || 'mail_transport',
    adminEmail: process.env.MAIL_SERVICE || 'fergurburgerman@gmail.com', 
    service: process.env.MAIL_SERVICE || 'Mailgun', 
    auth: {
      user: process.env.MAIL_USER || 'test@sandbox730ff4fff9a847e5b5019dd30ad6dc54.mailgun.org',
      pass: process.env.MAIL_PASS || '12345'
    },
    from : {
      name : process.env.MAIL_FROM_NAME || 'Justbookeh',
      address : process.env.MAIL_FROM_ADDRESS || 'no-reply@justbookeh.com'
    }
  },
  
  facebook: {
    clientID:     process.env.FACEBOOK_ID || 'id',
    clientSecret: process.env.FACEBOOK_SECRET || 'secret',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/facebook/callback'
  }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});