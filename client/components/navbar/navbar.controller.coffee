'use strict'

angular.module 'moneyApp'
.controller 'NavbarCtrl', ($scope, $location, $timeout, Auth, Log) ->

  $scope.isLoggedIn = Auth.isLoggedIn
  $scope.getCurrentUser = Auth.getCurrentUser

  $scope.logout = ->
    Log.info 'O004', 'this is body'
    $timeout ->
      Auth.logout()
    ,1000
    $location.path '/login'
