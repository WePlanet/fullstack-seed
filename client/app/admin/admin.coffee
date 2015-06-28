'use strict'

angular.module 'moneyApp'
.config ($stateProvider) ->
  $stateProvider.state 'operators',
    url: '/operators'
    templateUrl: 'app/admin/operators/operators.html'
    controller: 'OperatorsCtrl'
    authenticate: true
  $stateProvider.state 'logs',
    url: '/logs'
    templateUrl: 'app/admin/logs/logs.html'
    controller: 'LogsCtrl'
    authenticate: true
