'use strict';

var express = require('express');
var controller = require('./thing.controller');
var Joi = require('express-joi').Joi;
var joiValidate = require('express-joi').joiValidate;
var auth = require('../../auth/auth.service');
var router = express.Router();

var schema = {
  index: {
    year: Joi.number().integer().min(2000).optional(),
    month: Joi.number().integer().min(1).max(12).optional()
  },
  create: {
    name: Joi.string().required()
  },
  destroy: {
    id: Joi.number().integer().min(1).required()
  }
};

router.get('/', joiValidate(schema.index, {strict: false}), controller.index);
router.post('/', joiValidate(schema.create, {strict: false}), controller.create);
router.delete('/:id', joiValidate(schema.destroy, {strict: false}), controller.destroy);

module.exports = router;