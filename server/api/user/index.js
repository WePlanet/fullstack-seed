'use strict';

var express = require('express');
var controller = require('./user.controller');
var Joi = require('express-joi').Joi;
var router = express.Router();
var auth = require('../../auth/auth.service');

router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/me/profile', auth.isAuthenticated(), controller.update);
router.post('/me/profile/image', auth.isAuthenticated(), controller.uploadProfileImg);
router.get('/', auth.hasRole('admin'), controller.index);
router.post('/', controller.create);
router.delete('/', auth.hasRole('admin'), controller.remove);

module.exports = router;