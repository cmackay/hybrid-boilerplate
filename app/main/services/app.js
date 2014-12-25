
'use strict';

/**
 * @ngInject
 */
module.exports = function ($log, $q, dbs, config, _) {

  $log.debug('app service');

  dbs.notes
    .info()
    .then(function (info) {
      if (info.doc_count > 0) {
        return $q.when();
      }
      // create some default data
      return dbs.notes.bulkDocs([{
        title: 'item 1'
      }, {
        title: 'item 2'
      }]);
    });

  return {

    findNotes: function () {
      return dbs.notes.list();
    },

    getNote: function (noteId) {
      return dbs.notes.get(noteId);
    },

    saveNote: function (note) {
      return dbs.notes.save(note);
    },

    removeNote: function (note) {
      return dbs.notes.remove(note);
    },

    resetData: function () {
      return $q.all(_.transform(dbs, function (result, db, name) {
        result.push(db.destroy());
      }, []));
    }

  };
};
