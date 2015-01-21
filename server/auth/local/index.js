'use strict';

var express = require('express');
var controller = require('./local.controller');
var auth = require('../auth.service');
var router = express.Router();

router.get('/mailconfirmation', auth.isAuthenticated(), controller.sendConfirmationMail);
router.get('/mailcoachconfirmation', auth.isAuthenticated(), controller.sendCoachConfirmationMail);
router.post('/mailconfirmation', controller.confirmMailAddress);
router.post('/', controller.root);

module.exports = router;