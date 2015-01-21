'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN:           'http://localhost:9000',
  SESSION_SECRET:   'tennisbookingsite-secret1',

  FACEBOOK_ID:      'app-id',
  FACEBOOK_SECRET:  'secret',

  // Control debug level for modules using visionmedia/debug
  DEBUG: '',
  
  MAIL_SERVICE: "Mailgun", // sets automatically host, port and connection security settings
  MAIL_USER: "test@sandbox730ff4fff9a847e5b5019dd30ad6dc54.mailgun.org",
  MAIL_PASS: "12345",
  MAIL_FROM_NAME: "Tennis booking site",
  MAIL_FROM_ADDRESS: "noreply@justbookeh.com",
  MAIL_CONFIRMATION_SECRET: "mailconfsecret",

};
