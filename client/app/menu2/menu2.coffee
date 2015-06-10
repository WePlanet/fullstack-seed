'use strict'

angular.module 'moneyApp'
.config ($stateProvider) ->
  $stateProvider.state 'menu2',
    url: '/menu2'
    templateUrl: 'app/menu2/menu2.html'
    controller: 'Menu2Ctrl'
