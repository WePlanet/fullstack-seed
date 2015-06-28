'use strict';

var config = require('../config/environment');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
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
    role: {
      type: DataTypes.ENUM(config.userRoles),
      allowNull: false,
      defaultValue: 'user'
    },
    profileImg: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: config.aws.s3Bucket.url + '/profile/default.jpg'
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        //User.hasMany(models.Log, {constraints: false});
        //User.hasMany(models.Log);
      }
    }
  });
  return User;
};