'use strict'

angular.module 'moneyApp'
.controller 'NavbarCtrl', ($scope, $location, Auth) ->

  $scope.isLoggedIn = Auth.isLoggedIn
  $scope.getCurrentUser = Auth.getCurrentUser

  $scope.logout = ->
    Auth.logout()
    $location.path '/login'
