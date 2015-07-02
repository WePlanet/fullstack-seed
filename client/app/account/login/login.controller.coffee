'use strict'

angular.module 'moneyApp'
.controller 'LoginCtrl', ($scope, $location, Auth, Log) ->

  $scope.user = {}
  $scope.errors = {}

  $scope.login = () ->
    $scope.submitted = true
    $scope.errors = {}
    return if $scope.form.$invalid

    $scope.try = true
    Auth.login
      email: $scope.user.email
      password: $scope.user.password,
      $scope.stayLogin
    .then ->
      delete $scope.try
      $location.path '/'
      Log.info 'O002', 'agent'
    .catch (err) ->
      delete $scope.try
      $scope.errors.other = err.message
