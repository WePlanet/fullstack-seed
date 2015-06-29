'use strict'

angular.module 'moneyApp'
.controller 'LogsCtrl', ($scope, $http, socket) ->

  $http.get '/api/logs'
  .success (logs) ->
    $scope.logs = logs
    socket.syncUpdates 'log', $scope.logs

  $scope.$on '$destroy', ->
    socket.unsyncUpdates 'thing'
