'use strict';

var cryptoHelper = require('../components/crypto-helper');
var models = require('../models');

models.User.bulkCreate([
  {email: '6pack@wepla.net', password: cryptoHelper.md5('123123'), name: 'Chris', role: 'admin'},
  {email: 'ej88ej@gmail.com', password: cryptoHelper.md5('123123'), name: 'Jeonghwan', role: 'user'}
]).then(function () {
  models.Thing.bulkCreate([
    {name: 'todo1'},
    {name: 'todo2'}
  ]).then(function () {
    console.log('INFO', 'Seed date was inserted.')
  });
});