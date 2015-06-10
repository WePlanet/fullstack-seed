'use strict'

angular.module 'moneyApp'
.config ($stateProvider) ->
  $stateProvider.state 'menu3',
    url: '/menu3'
    templateUrl: 'app/menu3/menu3.html'
    controller: 'Menu3Ctrl'
