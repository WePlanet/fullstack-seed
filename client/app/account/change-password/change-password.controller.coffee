'use strict'

angular.module 'moneyApp'
.controller 'ChangePasswordCtrl', ($scope, $http, Auth) ->
  $scope.errors = {}

  $scope.resetPassword = (form) ->
    $scope.errors = {}
    $scope.submitted = true
    return if form.$invalid

    $http.put '/api/users/me/profile',
      oldPassword: form.oldPassword.$modelValue
      newPassword: form.newPassword1.$modelValue
    .success () ->
      $scope.finished = true
      Auth.logout()
    .error (err) ->
      console.error err
      $scope.errors.other = '비밀번호를 다시 입력하세요'

  $scope.showError = (form, validator, trySubmit) ->
    trySubmit && form.$error && form.$error[validator]

