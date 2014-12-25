
'use strict';

/**
 * Module dependencies
 */
var angular         = require('angular'),
  $exceptionHandler = require('./services/$exceptionHandler'),
  utils             = require('./services/utils');

module.exports = angular

  .module('common.util', [
  ])

  .service('$exceptionHandler', $exceptionHandler)
  .service('_', utils)

  .run(function ($log) {
    $log.debug('common.util module - run');
  });
