'use strict'

angular.module 'moneyApp'
.factory 'Auth', ($location, $rootScope, $http, User, $cookies, $q, Constants) ->
  currentUser = {}
  currentUser = User.get() if $cookies.get 'token'

  logout = ->
    $cookies.remove 'token'
    currentUser = {}

  login = (user, stayLogin) ->
    deferred = $q.defer()

    $http.post '/auth/local',
      email: user.email,
      password: user.password
    .success (data) ->
      if stayLogin
        $cookies.put 'token', data.token, {expires: Constants.cookieExpires()}
      else
        $cookies.put 'token', data.token
      currentUser = User.get()
      deferred.resolve data
    .error (err) ->
      logout();
      deferred.reject err

    deferred.promise

  isLoggedInAsync = (cb) ->
    if currentUser.hasOwnProperty '$promise'
      currentUser.$promise.then ->
        cb true
      .catch ->
        cb false
    else if currentUser.hasOwnProperty 'role'
      cb true
    else
      cb false

  isLoggedIn = ->
    currentUser.hasOwnProperty 'role'

  getCurrentUser = (options)->
    currentUser = User.get() if options && options.refresh
    currentUser

  isAdmin = ->
    currentUser.role is 'admin'


  login: login
  logout: logout
  isLoggedInAsync: isLoggedInAsync
  isLoggedIn: isLoggedIn
  getCurrentUser: getCurrentUser
  isAdmin: isAdmin