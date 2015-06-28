'use strict';

var Q = require('q');
var AWS = require('AWS-sdk');
var config = require('../../config/environment');
AWS.config.update({
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey,
  region: config.aws.region
});

exports.uploadFile = function (options) {
  var s3 = new AWS.S3();
  var deferred = Q.defer();
  var param = {
    Bucket: config.aws.s3Bucket.name,
    ACL: 'public-read',
    ContentType: 'image/jpeg',
    ContentEncoding: 'base64',
    Key: options.path,
    Body: options.data
  };

  s3.putObject(param, function (err, data) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(data);
    }
  });

  return deferred.promise;
};


