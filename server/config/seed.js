'use strict';

var cryptoHelper = require('../components/crypto-helper');
var models = require('../models');


models.LogCode.bulkCreate([
  {id: 'E001', message: 'Browser exception'},
  {id: 'U001', message: 'Register fail'},
  {id: 'U002', message: 'Register success'},
  {id: 'O001', message: 'Operator Login fail'},
  {id: 'O002', message: 'Operator Login success'},
  {id: 'O003', message: 'Operator Logout fail'},
  {id: 'O004', message: 'Operator Logout success'}
]).then(function () {
  models.User.bulkCreate([
    {email: '6pack@wepla.net', password: cryptoHelper.md5('123123'), name: 'Chris', role: 'admin'},
    {email: 'ej88ej@gmail.com', password: cryptoHelper.md5('123123'), name: 'Jeonghwan', role: 'operator'}
  ]).then(function () {
    models.Thing.bulkCreate([
      {name: 'todo1'},
      {name: 'todo2'}
    ]).then(function () {
      console.log('INFO', 'Seed data was inserted.')
    });
  });
});
