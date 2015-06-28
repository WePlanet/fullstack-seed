'use strict'

angular.module 'moneyApp'
.controller 'ChangePasswordCtrl', ($scope, $http, Auth) ->
  $scope.errors = {}

  $scope.resetPassword = (form) ->
    $scope.errors = {}
    $scope.submitted = true
    return if form.$invalid

    $http.put '/api/users/me/profile', {password: form.newPassword1.$modelValue}
    .then () ->
      $scope.finished = true
      Auth.logout()
    , () ->
      console.error errors
      $scope.errors.other = 'Fail'

  $scope.showError = (form, validator, trySubmit) ->
    trySubmit && form.$error && form.$error[validator]

