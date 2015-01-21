'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.get('/getFeatured', controller.getFeatured);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/confirmCoach', auth.hasRole('admin'), controller.confirmCoach);
router.put('/:id/password', auth.hasRole('user'), controller.changePassword);
router.put('/:id/profile', auth.hasRole('user'), controller.changeProfile);

// move to coach api
router.put('/:id/about', auth.hasRole('coach'), controller.changeAbout);
router.put('/:id/availability', auth.hasRole('coach'), controller.changeAvailability);

router.get('/:id', auth.hasRole('user'), controller.show);

router.post('/', controller.createUser);

module.exports = router;
