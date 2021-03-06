'use strict';

var tag = '[MODELS]';
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
var mysqlCfg = require('../config/environment').mysql;
var sequelize = new Sequelize(mysqlCfg.database, mysqlCfg.username, mysqlCfg.password, mysqlCfg);
var db = {};

console.info(tag, 'MODELS ARE INITICATED. mysqlCfg:', mysqlCfg);

fs
    .readdirSync(__dirname)
    .filter(function (file) {
      return (file.indexOf('.') !== 0) && (file !== basename);
    })
    .forEach(function (file) {
      var model = sequelize['import'](path.join(__dirname, file));
      db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
