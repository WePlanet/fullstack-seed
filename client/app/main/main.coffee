'use strict'

angular.module 'moneyApp'
.config ($stateProvider) ->
  $stateProvider.state 'main',
    url: '/'
    templateUrl: 'app/main/main.html'
    controller: 'MainCtrl'
    authenticate: true
