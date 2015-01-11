
'use strict';

/**
 * @class NotesIndexCtrl
 * @classdesc The notes index
 * @ngInject
 */
function NotesIndexCtrl ($log, $state, $ionicActionSheet, notes, app) {

  var vm = this;

  vm.title = 'My Notes';
  vm.notes = notes;

  vm.showActionSheet = function (note) {
    var hideSheet = $ionicActionSheet.show({
      buttons: [{
        text: 'Edit Note'
      }],
      destructiveText : 'Delete',
      cancelText      : 'Cancel',
      buttonClicked: function (index) {
        if (index === 0) {
          $state.go('notes.detail', {
            id: note._id
          });
        }
        return true;
      },
      destructiveButtonClicked: function () {
        app.removeNote(note)
          .then(function () {
            $state.go('notes.index', {}, {reload: true});
          }, function (err) {
            $log.error('removeNote error', err);
          });
      }
    });
  };

}

NotesIndexCtrl.template = require('./index.html');

NotesIndexCtrl.resolve = {

  notes: function (app) {
    return app.findNotes();
  }

};

module.exports = NotesIndexCtrl;
