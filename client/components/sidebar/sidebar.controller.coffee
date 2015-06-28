'use strict'

angular.module 'moneyApp'
.controller 'SidebarCtrl', ($scope, $location, Auth) ->

  $scope.isAdmin = Auth.isAdmin

  $scope.isActive = (route) ->
    route is $location.path()

  $scope.menu = [
    {link: '/menu1', title: 'Menu 1'},
    {link: '/menu2', title: 'Menu 2'},
    {link: '/menu3', title: 'Menu 3'}
  ]

  $scope.adminMenu = [
    {link: '/admin', title: 'Admin'}
  ]

