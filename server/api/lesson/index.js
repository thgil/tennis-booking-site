'use strict';

var express = require('express');
var controller = require('./lesson.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/me', auth.isAuthenticated(), controller.mylessons);
router.post('/', auth.hasRole('user'), controller.create);
router.put('/:id', auth.hasRole('user'), controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;