'use strict';

var config = require('../config/environment');

module.exports = function(sequelize, DataTypes) {
  var LogCode = sequelize.define('LogCode', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        LogCode.hasMany(models.Log);
      }
    }
  });
  return LogCode;
};