'use strict'

angular.module 'moneyApp'
.controller 'NavbarCtrl', ($scope, $location, Auth) ->

  $scope.isLoggedIn = Auth.isLoggedIn
  $scope.isAdmin = Auth.isAdmin
  $scope.getCurrentUser = Auth.getCurrentUser

  $scope.isActive = (route) ->
    route is $location.path()

  $scope.logout = ->
    Auth.logout()
    $location.path '/login'

  $scope.menu = [
    {link: '/menu1', title: 'Menu 1'},
    {link: '/menu2', title: 'Menu 2'},
    {link: '/menu3', title: 'Menu 3'}
  ]

  $scope.adminMenu = [
    {link: '/admin', title: 'Admin'}
  ]

