'use strict';

var Q = require('q');
var models = require('../models');
var cryptoHelper = require('../components/crypto-helper');

function logCode() {
  return models.LogCode.bulkCreate([
    {id: 'E001', message: 'Browser exception'},
    {id: 'U001', message: 'Register fail'},
    {id: 'U002', message: 'Register success'},
    {id: 'O001', message: 'Operator Login fail'},
    {id: 'O002', message: 'Operator Login success'},
    {id: 'O003', message: 'Operator Logout fail'},
    {id: 'O004', message: 'Operator Logout success'}
  ]);
}

function user() {
  models.User.bulkCreate([
    {email: '6pack@wepla.net', password: cryptoHelper.md5('123123'), name: 'Chris', role: 'admin'},
    {email: 'ej88ej@gmail.com', password: cryptoHelper.md5('123123'), name: 'Jeonghwan', role: 'operator'}
  ]);
}

function thing() {
  models.Thing.bulkCreate([
    {name: 'todo1'},
    {name: 'todo2'}
  ]);
}

exports.insert = function (seedDB) {
  var deferred = Q.defer();

  if (!seedDB) deferred.resolve(false);

  logCode()
      .then(user)
      .then(thing)
      .then(function () {
        deferred.resolve(true);
      });

  return deferred.promise;
};
