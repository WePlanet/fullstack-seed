'use strict'

angular.module 'moneyApp'
.config ($stateProvider) ->
  $stateProvider.state 'menu1',
    url: '/menu1'
    templateUrl: 'app/menu1/menu1.html'
    controller: 'Menu1Ctrl'
    authenticate: true
