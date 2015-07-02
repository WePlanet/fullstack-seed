'use strict'

angular.module 'moneyApp'
.factory 'Constants', () ->
  cookieExpires = ->
    moment().add(1, 'months').toDate()


  cookieExpires: cookieExpires