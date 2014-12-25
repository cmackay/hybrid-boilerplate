
'use strict';

/**
 * Module dependencies
 */
var angular       = require('angular'),
  NotesIndexCtrl  = require('./controllers/index'),
  NotesDetailCtrl = require('./controllers/detail');

module.exports = angular

  .module('app.notes', [
    require('../common/libs').name,
    require('../main').name
  ])

  .config(function ($stateProvider) {

    $stateProvider

      .state('notes', {
        url      : '/notes',
        abstract : true,
        template : '<ui-view/>'
      })

      .state('notes.index', {
        url          : '',
        controllerAs : 'notesIndexCtrl',
        controller   : NotesIndexCtrl,
        template     : NotesIndexCtrl.template,
        resolve      : NotesIndexCtrl.resolve
      })

      .state('notes.detail', {
        url          : '/detail/:id',
        controllerAs : 'notesDetailCtrl',
        controller   : NotesDetailCtrl,
        template     : NotesDetailCtrl.template,
        resolve      : NotesDetailCtrl.resolve
      });
  })

  .run(function ($log) {
    $log.debug('app.notes module - run');
  });
