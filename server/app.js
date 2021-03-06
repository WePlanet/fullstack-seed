/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var models = require('./models');
var config = require('./config/environment');

// Setup server
var app = express();
var server = require('http').createServer(app);
var socketio = require('socket.io')(server, {
  serverClient: config.env !== 'production',
  path: '/socket.io-client'
});
require('./config/socketio')(socketio);
require('./config/express')(app);
require('./config/passport')(app);
require('./routes')(app);

// Sync Database
models.sequelize.sync({force: true}).then(function () {

  // Insert seed data
  require('./config/seed').insert(config.seedDB).then(function (result) {
    if (result) console.log('INFO', 'Seed data was inserted.');

    // Start server
    server.listen(config.port, config.ip, function () {
      console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
    });
  });
});

// Expose app
exports = module.exports = app;