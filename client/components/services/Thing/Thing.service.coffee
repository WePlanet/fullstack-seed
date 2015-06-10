'use strict'

angular.module 'moneyApp'
.factory 'Thing', ($resource) ->
  $resource '/api/things/:id', {id: '@id'},
    query:
      method: 'GET'
      isArray: true
