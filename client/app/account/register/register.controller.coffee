'use strict'

angular.module 'moneyApp'
.controller 'RegisterCtrl', ($scope, $http) ->

  $scope.user = {}
  $scope.errors = {}

  $scope.register = (form) ->
    $scope.submitted = true
    $scope.errors = {}
    return if form.$invalid

    $http.post '/api/users', {email: form.email.$modelValue, password: form.password.$modelValue}
    .success () ->
      $scope.registerd = true
    .error (error) ->
      if error.name is 'SequelizeUniqueConstraintError'
        $scope.errors.other = 'The email is already registerd.'
      else
        $scope.errors.other = 'Sorry registration is fail.'

