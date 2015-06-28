'use strict';

var _ = require('lodash');
var config = require('../../config/environment');
var User = require('../../models').User;
var cryptoHelper = require('../../components/crypto-helper');
var awsHelper = require('../../components/aws-helper');

// Get list of users
exports.index = function (req, res) {
  User.findAll()
      .then(function (users) {
        res.json(users);
      })
      .catch(function (err) {
        res.send(500, err);
      });
};

// Get the user
exports.me = function (req, res) {
  User.find({
    where: {id: req.user.id}
  }).then(function (user) {
    if (!user) return res.send(404);
    delete user.password;
    res.json(user);
  }, function (err) {
    console.error(err);
    req.send(403, err);
  });
};

// Create new user
exports.create = function (req, res) {
  User.create({
    email: req.body.email,
    password: cryptoHelper.md5(req.body.password),
    name: req.body.name || ''
  })
      .then(function (user) {
        res.json(user);
      })
      .catch(function (err) {
        res.send(500, err);
      });
};

// Update the user
exports.update = function (req, res) {
  var updateValues = {
    name: req.body.name,
    password: cryptoHelper.md5(req.body.password)
  };
  updateValues = _.omit(updateValues, function (value, key, list) {
    return value === undefined;
  });
  if (_.isEmpty(updateValues)) {
    return res.status(400).send();
  }

  User.find({
    where: {id: req.user.id}
  }).then(function (user) {
    user.updateAttributes(updateValues)
        .then(function (data) {
          res.json(data);
        }, function (err) {
          res.send(400, err);
        });
  }, function (err) {
    res.status(400).json(err);
  });
};

exports.uploadProfileImg = function (req, res) {
  var profileImgUrl = 'profile/' + req.user.id;
  var buf = new Buffer(req.body.data.replace(/^data:image\/\w+;base64,/, ""),'base64');
  awsHelper.uploadFile({
    path: profileImgUrl,
    data: buf
  }).then(function(data) {
    User.find({
      where: {id: req.user.id}
    }).then(function (user) {
      user.updateAttributes({
        profileImg: config.aws.s3Bucket.url + '/' + profileImgUrl
      }).then(function (data) {
        res.json(data);
      }, function (err) {
        console.error(err);
        res.send(500, err);
      });
    }, function (err) {
      console.error(err);
      res.send(500, err);
    });
  }, function(err) {
    console.error(err);
    res.send(500, err);
  })
};

// Remove user
exports.remove = function (req, res) {
  User.destroy({where: {id: req.user.id}})
      .then(function (affectedRows) {
        if (affectedRows) {
          req.session.destroy();
          res.send(204);
        } else {
          res.send(404);
        }
      })
      .catch(function (err) {
        res.send(500, err);
      });
};