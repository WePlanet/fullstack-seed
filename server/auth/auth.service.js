'use strict';

var passport = require('passport');
var config = require('../config/environment');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var validateJwt = expressJwt({secret: config.secrets.session});
var User = require('../models').User;
var debug = require('debug')('auth');


/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
  return compose()
      // Validate jwt
      .use(function (req, res, next) {
        // allow access_token to be passed through query parameter as well
        if (req.query && req.query.hasOwnProperty('access_token')) {
          req.headers.authorization = 'Bearer ' + req.query.access_token;
        }
        validateJwt(req, res, next);
      })
      .use(function (err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
          res.send(401, 'invalid token...');
        }
      })
      // Attach user to request
      .use(function (req, res, next) {
        User.findOne({
          where: {id: req.user.id}
        })
        .then(function (user) {
          if (!user) return res.send(401);

          req.user = user.get({plain: true});
          next();
        }).catch(function (err) {
          return next(err);
        });
      });
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
function hasRole(roleRequired) {
  if (!roleRequired) throw new Error('Required role needs to be set');

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
        next();
      }
      else {
        res.send(401);
      }
    });
}

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id, role) {
  return jwt.sign({id: id, role: role}, config.secrets.session, {expiresInMinutes: 60 * 5}); // 5 hours
}

function decodeToken() {
  return expressJwt({secret: config.secrets.session});
}

exports.isAuthenticated = isAuthenticated;
exports.hasRole = hasRole;
exports.signToken = signToken;
exports.decodeToken = decodeToken;
