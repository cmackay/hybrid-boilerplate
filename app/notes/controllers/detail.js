
'use strict';

/**
 * @class NotesDetailCtrl
 * @classdesc The note detail
 * @ngInject
 */
function NotesDetailCtrl ($state, app, note) {

  var vm = this;

  vm.title = 'Note Details';
  vm.note = note;

  /**
   * @description Saves the note
   */
  vm.save = function () {
    app
      .saveNote(vm.note)
      .then(function () {
        $state.go('notes.index');
      });
  };

  vm.cancel = function () {
    $state.go('notes.index');
  };

}

NotesDetailCtrl.template = require('./detail.html');

NotesDetailCtrl.resolve = {

  note: function ($q, $stateParams, app) {
    if ($stateParams.id === 'new') {
      return $q.when({});
    }
    return app.getNote($stateParams.id);
  }

};

module.exports = NotesDetailCtrl;
