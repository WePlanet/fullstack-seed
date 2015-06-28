'use strict'

angular.module 'moneyApp'
.controller 'SettingsCtrl', ($scope, $http, Auth) ->

  $scope.user = Auth.getCurrentUser()

  $scope.editedUser =
    name: $scope.user.name

  $scope.updateName = (form) ->
    return if form.$invalid
    $http.put '/api/users/me/profile', name: form.name.$modelValue
    .success () ->
      $scope.user = Auth.getCurrentUser refresh: true
      delete $scope.onEditName
    .error (err) ->
      console.error err
