
'use strict';

/**
* @class NotesIndexCtrl
* @classdesc The notes index
* @ngInject
*/
function NotesIndexCtrl ($log, notes, app) {

  var vm = this;

  vm.title = 'My Notes';
  vm.notes = notes;

}

NotesIndexCtrl.template = require('./index.html');

NotesIndexCtrl.resolve = {

  notes: function (app) {
    return app.findNotes();
  }

};

module.exports = NotesIndexCtrl;
