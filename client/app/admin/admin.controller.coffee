'use strict'

angular.module 'moneyApp'
.controller 'AdminCtrl', ($scope, $http) ->

  $http.get '/api/users'
  .success (data) ->
    $scope.users = data
  .error (error) ->
    console.error error