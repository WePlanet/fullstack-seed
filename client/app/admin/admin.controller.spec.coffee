'use strict'

describe 'Controller: AdminCtrl', ->

  # load the controller's module
  beforeEach module 'moneyApp'
  AdminCtrl = undefined
  scope = undefined

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    AdminCtrl = $controller 'AdminCtrl',
      $scope: scope

  it 'should ...', ->
    expect(1).toEqual 1
