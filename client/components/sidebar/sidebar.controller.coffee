'use strict'

angular.module 'moneyApp'
.controller 'SidebarCtrl', ($scope, $location, Auth) ->

  $scope.isAdmin = Auth.isAdmin

  $scope.isActive = (route) ->
    route is $location.path()

  $scope.menu = [
    {link: '/menu1', title: 'Menu 1'},
  ]

  $scope.adminMenu = [
    {link: '/operators', title: 'Operators'}
    {link: '/logs', title: 'Logs'}
  ]

