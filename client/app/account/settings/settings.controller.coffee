'use strict'

angular.module 'moneyApp'
.controller 'SettingsCtrl', ($scope, $http, Auth) ->

  $scope.user = Auth.getCurrentUser()

  $scope.onEditProfile = ->
    $scope.editMode = !$scope.editMode
    $scope.editedUser =
      name: $scope.user.name

  $scope.editedUser =
    name: $scope.user.name

  $scope.save = (form) ->
    return if form.$invalid
    console.log form.name.$modelValue

    $http.put '/api/users/me/profile', name: form.name.$modelValue
    .success (user) ->
      $scope.user = user
      delete $scope.editMode
    .error (err) ->
      console.error err
