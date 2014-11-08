'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/coach', controller.getCoaches);
router.post('/coach', controller.createCoach);
router.get('/coach/:id', controller.showCoach);

router.get('/', auth.hasRole('admin'), controller.index);
router.get('/getFeatured', controller.getFeatured);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id/about', auth.hasRole('coach'), controller.changeAbout);
router.put('/:id/availability', auth.hasRole('coach'), controller.changeAvailability);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);

module.exports = router;
