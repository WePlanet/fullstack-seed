/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var models = require('../../models');

exports.register = function(socket) {
  models.Log.hook('afterCreate', function(log, options, fn) {
    models.Log.find({
      where: {id: log.id},
      include: [
        {model: models.User, attributes: ['id', 'name', 'role']},
        {model: models.LogCode, attributes: ['id', 'message']}
      ]
    }).then(function (log) {
      onSave(socket, log);
      fn(null, log);
    });
  });
};

function onSave(socket, log) {
  socket.emit('log:save', log);
}

