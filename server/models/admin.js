'use strict';

var config = require('../config/environment');

module.exports = function(sequelize, DataTypes) {
  var Admin = sequelize.define('Admin', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM(config.roles.slice(0)), // remove 'user'
      allowNull: false,
      defaultValue: 'user'
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profileImg: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: config.aws.s3Bucket.url + '/profile/default.jpg'
    }
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });
  return Admin;
};