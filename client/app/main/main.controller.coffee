'use strict'

angular.module 'moneyApp'
.controller 'MainCtrl', ($scope, Thing) ->

  $scope.awesomeThings = Thing.query()

  $scope.addThing = ->
    return if $scope.newThing is ''
    Thing.save name: $scope.newThing
    .$promise
    .then (newThing) ->
      $scope.awesomeThings.push newThing
      $scope.newThing = ''

  $scope.deleteThing = (thing) ->
    Thing.remove id: thing.id
    .$promise
    .then ->
      _.remove $scope.awesomeThings, (n) ->
        n.id is thing.id

