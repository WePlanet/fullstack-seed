'use strict'

angular.module 'moneyApp'
.directive 'validateEquals', ->
  restrict: 'A'
  require: 'ngModel'
  link: (scope, element, attrs, ngModelCtrl) ->
    validateEqual = (myValue) ->
      if (myValue)
        valid = myValue is scope.$eval(attrs.validateEquals)
        ngModelCtrl.$setValidity('equal', valid)
        valid ? myValue : undefined

    ngModelCtrl.$parsers.push validateEqual
    ngModelCtrl.$formatters.push validateEqual
