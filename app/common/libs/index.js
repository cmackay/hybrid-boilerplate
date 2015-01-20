
'use strict';

/**
 * Module dependencies
 */
var angular = require('angular');

// set the public path
var scripts = global.document.getElementsByTagName('script');
var src = scripts[scripts.length - 1].getAttribute('src');
global.__webpack_public_path__ = src.substr(0, src.lastIndexOf('/') + 1);

// Add Angular/Ionic dependencies
require('angular-animate');
require('angular-sanitize');
require('angular-ui-router');
require('ionic/release/js/ionic');
require('ionic/release/js/ionic-angular');

// This module provides a place for global
var libsModule = module.exports = angular

  .module('common.libs', [
    'ionic'
  ])

  .run(function ($log) {
    $log.debug('common.lib module - run');
  });
