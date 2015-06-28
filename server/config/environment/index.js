'use strict';

var path = require('path');
var _ = require('lodash');
var dbConfig = require('../config.json')[process.env.NODE_ENV];
var emailConfig = require('../emailConfig.json')[process.env.NODE_ENV];
var awsConfig = require('../awsConfig.json')[process.env.NODE_ENV];

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Should we populate the DB with sample data?
  seedDB: true,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'fullstack-seed'
  },

  // List of user roles
  userRoles: ['user', 'operator', 'admin'],

  // Mysql
  mysql: {
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    host: dbConfig.host,
    dialect: dbConfig.dialect
  },

  // Email component
  email: {
    service: 'Gmail',
    senderAddress: emailConfig.senderAddress,
    password: emailConfig.password
  },

  // AWS Settings
  aws: {
    accessKeyId: awsConfig.accessKeyId,
    secretAccessKey: awsConfig.secretAccessKey,
    region: awsConfig.region,
    s3Bucket: {
      name: awsConfig.s3Bucket.name,
      url: awsConfig.s3Bucket.url
    }
  }


};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});