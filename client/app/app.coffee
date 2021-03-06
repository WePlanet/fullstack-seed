'use strict'

angular.module 'moneyApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ngImgCrop'
]
.config ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) ->
  $urlRouterProvider
  .otherwise () ->
    window.location.href = '/notfound'

  $locationProvider.html5Mode true
  $httpProvider.interceptors.push 'authInterceptor'

.factory 'authInterceptor', ($rootScope, $q, $cookies, $location) ->
  # Add authorization token to headers
  request: (config) ->
    config.headers = config.headers || {}
    # https://tools.ietf.org/html/rfc6750#page-5
    config.headers.Authorization = 'Bearer ' + $cookies.get('token') if $cookies.get('token')
    config
  # Intercept 401s and redirect you to login
  responseError: (response) ->
    if response.status is 401
      $location.path '/login'
      # remove any stale tokens
      $cookies.remove 'token'
      $q.reject response
    else
      $q.reject response

.run ($rootScope, $location, Auth) ->
  # Redirect to login if route requires auth and you're not logged in
  $rootScope.$on '$stateChangeStart', (event, next) ->
    Auth.isLoggedInAsync (loggedIn) ->
      if next.authenticate && !loggedIn
        $location.path '/login'
