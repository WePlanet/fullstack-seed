'use strict'

angular.module 'moneyApp'
.config ($stateProvider) ->
  $stateProvider
  .state 'login',
    url: '/login'
    templateUrl: 'app/account/login/login.html'
    controller: 'LoginCtrl'
  .state 'register',
    url: '/register'
    templateUrl: 'app/account/register/register.html'
    controller: 'RegisterCtrl'
  .state 'forgot-password',
    url: '/forgot-password'
    templateUrl: 'app/account/forgot-password/forgot-password.html'
    controller: 'ForgotPasswordCtrl'
  .state 'change-password',
    url: '/change-password'
    templateUrl: 'app/account/change-password/change-password.html'
    controller: 'ChangePasswordCtrl'
    authenticate: true
  .state 'settings',
    url: '/settings'
    templateUrl: 'app/account/settings/settings.html'
    controller: 'SettingsCtrl'
    authenticate: true
