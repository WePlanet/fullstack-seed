'use strict'

angular.module 'moneyApp'
.provider '$exceptionHandler', $get: (ExceptionLogToServer) ->
  return ExceptionLogToServer

angular.module 'moneyApp'
.factory 'ExceptionLogToServer', ($log, $window) ->
  error = (exception, cause) ->
    $log.error.apply $log, arguments
    body =
      url: $window.location.href
      stackTrace: printStackTrace
        e: exception
      agent: 'Chrome'

    try
      $.ajax
        type: 'POST'
        url: '/api/logs',
        data:
          tag: 'exception'
          logCode: 'E001'
          body: angular.toJson body
  error

angular.module 'moneyApp'
.factory 'Log', ($http) ->

  send = (tag, logCode, body) ->
    $http.post '/api/logs', {tag: tag, logCode: logCode, body: body}

  info = (logCode, body)->
    send 'info', logCode, body

  warn = (logCode, body)->
    send 'warn', logCode, body

  error = (logCode, body)->
    send 'error', logCode, body

  exception = (logCode, body)->
    send 'exception', logCode, body

  info: info
  warn: warn
  error: error
  exception: exception
