'use strict';

var express = require('express');
var controller = require('../user/user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.getCoaches);
router.get('/:id', controller.showCoach);
router.post('/', controller.createCoach);

module.exports = router;
