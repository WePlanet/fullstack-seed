'use strict'

angular.module 'moneyApp'
.controller 'OperatorsCtrl', ($scope, $http) ->

  $http.get '/api/users'
  .success (data) ->
    $scope.users = data
  .error (error) ->
    console.error error