'use strict';

var _ = require('lodash');
var models = require('../../models');
var Thing = models.Thing;

// Get list of things
exports.index = function (req, res) {
  Thing.findAll({}).then(function (things) {
    res.json(things);
  }).catch(function (error) {
    res.send(500, error);
  });
};

// New thing
exports.create = function (req, res) {
  Thing.create({
    name: req.body.name
  }).then(function (thing) {
    res.json(201, thing)
  }).catch(function (error) {
    res.send(500, error);
  });
};

// Remove a thing
exports.destroy = function (req, res) {
  Thing.find(req.params.id).then(function (thing) {
    if (!thing) return res.send(404);
    thing.destroy().then(function () {
      res.send(204);
    }).catch(function (error) {
      res.send(500, error);
    });
  });
};
