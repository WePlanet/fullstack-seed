'use strict';

var _ = require('lodash');
var models = require('../../models');

// Get list of logs
exports.index = function (req, res) {
  models.Log.findAll({
    order: 'createdAt DESC',
    include: [
      {model: models.User, attributes: ['id', 'name', 'role']},
      {model: models.LogCode, attributes: ['id', 'message']}
    ]
  }).then(function (logs) {
    res.json(logs);
  }, function (err) {
    console.error(err);
    res.send(500, err);
  });
};

// New log
exports.create = function (req, res) {
  models.Log.create({
    tag: req.body.tag,
    body: req.body.body,
    LogCodeId: req.body.logCode,
    UserId: req.user ? req.user.id : null
  }).then(function (log) {
    res.json(201, log)
  }, function (err) {
    console.error(err);
    res.send(500, err);
  });
};

// New exception log
exports.createException = function (req, res) {
  models.Log.create({
    tag: req.body.tag,
    body: req.body.body,
    LogCodeId: req.body.logCode,
    UserId: null
  }).then(function (log) {
    res.json(201, log)
  }, function (err) {
    console.error(err);
    res.send(500, err);
  });
};

// Remove a thing
//exports.destroy = function (req, res) {
//  Thing.find(req.params.id).then(function (thing) {
//    if (!thing) return res.send(404);
//    thing.destroy().then(function () {
//      res.send(200, thing);
//    }, function (error) {
//      console.error(error);
//      res.send(500, error);
//    });
//  });
//};
