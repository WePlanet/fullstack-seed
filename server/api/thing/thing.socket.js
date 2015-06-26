/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Thing = require('../../models').Thing;

exports.register = function(socket) {
  console.log('thing.socket.js: register()');

  Thing.hook('afterCreate', function(thing, options, fn) {
    onSave(socket, thing);
    fn(null, thing);
  });

  Thing.hook('afterDestroy', function(thing, options, fn) {
    onRemove(socket, thing);
    fn(null, thing);
  });
};

function onSave(socket, thing) {
  socket.emit('thing:save', thing);
}

function onRemove(socket, thing) {
  socket.emit('thing:remove', thing);
}