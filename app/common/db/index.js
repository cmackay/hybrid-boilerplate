
'use strict';

/**
* Module dependencies
*/
var angular = require('angular');

module.exports = angular

  .module('common.db', [
    require('../util').name
  ])

  .provider('dbs', require('./services/dbs'))

  .run(function ($log) {
    $log.debug('common.db module - run');
  });
