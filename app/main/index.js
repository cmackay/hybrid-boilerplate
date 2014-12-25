
'use strict';

/**
 * Module dependencies
 */
var angular    = require('angular'),
  AppContainer = require('./directives/appContainer');

module.exports = angular

  .module('app.layout', [
    require('../common/libs').name,
    require('../common/db').name,
  ])

  .constant('config', {
    backdrop      : true,
    debug         : true,
    defaultRoute  : '/notes',
    activeTimerId : 'at',
    hrefWhitelist : /^\s*(https?|ftp|mailto|file|tel):/
  })

  .constant('appVersion', require('../../package.json').version)

  .config(function ($compileProvider, $urlRouterProvider, config) {
    // set anchor href whitelist
    if (config.hrefWhitelist) {
      $compileProvider.aHrefSanitizationWhitelist(config.hrefWhitelist);
    }
    // add default route
    if (config.defaultRoute) {
      $urlRouterProvider.otherwise(config.defaultRoute);
    }
  })

  .config(function (dbsProvider) {
    dbsProvider
      .db('notes', {
        auto_compaction : true,
        adapter         : 'websql'
      });
  })

  .directive('appContainer', AppContainer)

  .factory('app', require('./services/app'))

  .run(function ($log, $rootScope, $ionicBackdrop, $timeout, config) {

    $log.debug('app.main module - run');

    if (config.debug) {
      $rootScope.$on('$stateChangeStart',
        function (event, toState) {
          $log.debug('$stateChangeStart -', toState.name);
        });

      $rootScope.$on('$stateChangeSuccess',
        function (event, toState) {
          $log.debug('$stateChangeSuccess -', toState.name);
        });
    }

    $rootScope.$on('$stateNotFound',
      function (event, unfoundState, fromState, fromParams) {
        $log.warn('$stateNotFound', {
          event        : event,
          unfoundState : unfoundState,
          fromState    : fromState,
          fromParams   : fromParams
        });
      });

    $rootScope.$on('$stateChangeError',
      function (event, toState, toParams, fromState, fromParams, error) {
        $log.error('$stateChangeError', {
          event      : event,
          toState    : toState,
          toParams   : toParams,
          fromState  : fromState,
          fromParams : fromParams,
          error      : error
        });
        if (error) {
          throw error;
        }
      });

    // add backdrop if enabled
    if (config.backdrop) {
      $ionicBackdrop.retain();

      $timeout(function () {
        $ionicBackdrop.release();
      }, 600);
    }
  });
