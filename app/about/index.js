
'use strict';

/**
* Module dependencies
*/
var angular      = require('angular'),
  AboutIndexCtrl = require('./controllers/index');

module.exports = angular

  .module('app.about', [
    require('../common/libs').name
  ])

  .config(function ($stateProvider) {

    $stateProvider

      .state('about', {
        url      : '/about',
        abstract : true,
        template : '<ui-view/>'
      })

      .state('about.index', {
        url          : '/',
        controllerAs : 'aboutIndexCtrl',
        controller   : AboutIndexCtrl,
        template     : AboutIndexCtrl.template,
        resolve      : AboutIndexCtrl.resolve
      });

  })

  .run(function ($log) {
    $log.debug('app.about module - run');
  });
