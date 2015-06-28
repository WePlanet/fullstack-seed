'use strict';

var config = require('../config/environment');

module.exports = function(sequelize, DataTypes) {
  var Log = sequelize.define('Log', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    tag: {
      type: DataTypes.ENUM(config.logTags),
      allowNull: false
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Log.belongsTo(models.User, {foreignKey: 'UserId'});
        Log.belongsTo(models.LogCode, {foreignKey: 'LogCodeId'});
      }
    }
  });
  return Log;
};