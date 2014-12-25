
'use strict';

/**
 * Module dependencies
 */
var angular  = require('angular'),
  ionic      = require('ionic/js/ionic');

/**
 * Setup App Module
 */
var appModule = module.exports = angular

  .module('app', [
    require('./common/libs').name,
    require('./about').name,
    require('./main').name,
    require('./notes').name,
  ])

  .run(function ($log) {
    $log.debug('app module - run');
  });

// Add the styles to the page
require('./index.scss');

// Bootstrap App Module
ionic.Platform.ready(function () {
  angular.bootstrap(window.document, [
    appModule.name
  ]);
});
