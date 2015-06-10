'use strict'

describe 'Controller: Menu1Ctrl', ->

  # load the controller's module
  beforeEach module 'moneyApp'
  Menu1Ctrl = undefined
  scope = undefined

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    Menu1Ctrl = $controller 'Menu1Ctrl',
      $scope: scope

  it 'should ...', ->
    expect(1).toEqual 1
