'use strict'

describe 'Controller: Menu3Ctrl', ->

  # load the controller's module
  beforeEach module 'moneyApp'
  Menu3Ctrl = undefined
  scope = undefined

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    Menu3Ctrl = $controller 'Menu3Ctrl',
      $scope: scope

  it 'should ...', ->
    expect(1).toEqual 1
