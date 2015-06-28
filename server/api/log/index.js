'use strict';

var express = require('express');
var controller = require('./log.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.post('/', controller.create);
//router.delete('/:id', joiValidate(schema.destroy, {strict: false}), controller.destroy);

module.exports = router;