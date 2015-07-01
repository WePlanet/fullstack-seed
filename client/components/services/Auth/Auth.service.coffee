'use strict'

angular.module 'moneyApp'
.factory 'Auth', ($location, $rootScope, $http, User, $cookieStore, $q) ->
  currentUser = {}
  currentUser = User.get() if $cookieStore.get 'token'

  logout = ->
    $cookieStore.remove 'token'
    currentUser = {}

  login = (user) ->
    deferred = $q.defer()

    $http.post '/auth/local',
      email: user.email,
      password: user.password
    .success (data) ->

      # TODO Have to use $cookie service
      # $cookie.put('token', data.token, {expire: new Date('expired date')})
      $cookieStore.put 'token', data.token
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