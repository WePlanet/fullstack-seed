'use strict'

describe 'Controller: Menu2Ctrl', ->

  # load the controller's module
  beforeEach module 'moneyApp'
  Menu2Ctrl = undefined
  scope = undefined

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    Menu2Ctrl = $controller 'Menu2Ctrl',
      $scope: scope

  it 'should ...', ->
    expect(1).toEqual 1
