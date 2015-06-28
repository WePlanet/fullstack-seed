'use strict'

angular.module 'moneyApp'
.controller 'MainCtrl', ($scope, Thing, $http, socket) ->

  $scope.awesomeThings = []

  $http.get('/api/things')
  .success (awesomeThings) ->
    $scope.awesomeThings = awesomeThings
    socket.syncUpdates 'thing', $scope.awesomeThings

  $scope.addThing = ->
    return if $scope.newThing == ''
    $http.post '/api/things', name: $scope.newThing
    $scope.newThing = ''

  $scope.deleteThing = (thing) ->
    $http.delete '/api/things/' + thing.id

  $scope.$on '$destroy', ->
    socket.unsyncUpdates 'thing'


  foo = voo