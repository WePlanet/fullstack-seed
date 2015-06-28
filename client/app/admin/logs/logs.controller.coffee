'use strict'

angular.module 'moneyApp'
.controller 'LogsCtrl', ($scope, $http) ->
  $http.get '/api/logs'
  .success (logs) ->
    $scope.logs = logs