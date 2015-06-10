'use strict';

module.exports = function(sequelize, DataTypes) {
  var Thing = sequelize.define('Thing', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Thing;
};