'use strict'

describe 'Service: Thing', ->

  # load the service's module
  beforeEach module 'moneyApp'

  # instantiate service
  Thing = undefined
  beforeEach inject (_Thing_) ->
    Thing = _Thing_

  it 'should do something', ->
    expect(!!Thing).toBe true