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

  $scope.updateProfileImage = (data) ->
    console.log data
    $http.post '/api/users/me/profile/image', data: data
    .success (data) ->
      delete $scope.onEditProfile
      $scope.user = Auth.getCurrentUser refresh: true
    .error (err) ->
      console.error err


  # TODO Change to https://github.com/fengyuanchen/cropper
  $scope.myImage = ''
  $scope.myCroppedImage = ''
  angular.element document.querySelector '#fileInput'
  .on 'change', (evt) ->
    console.log 'onchanged'
    file = evt.currentTarget.files[0]
    reader = new FileReader()
    reader.onload = (evt) ->
      console.log 'onload'
      $scope.$apply ($scope) ->
        console.log 'hd'
        $scope.myImage = evt.target.result
        console.log $scope.myImage
    reader.readAsDataURL file