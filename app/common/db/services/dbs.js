
'use strict';

/**
 * Module dependencies
 */
var angular = require('angular'),
  PouchDB   = require('pouchdb');

/**
 * @ngInject
 */
module.exports = function () {

  var dbs = {};

  return {

    db: function db (name, opts) {
      dbs[name] = opts || {};
      return this;
    },

    $get: function $get ($q, $timeout, $log, _) {

      var defaults = {
        hooks: {
          post: function (pouchdb, fn) {
            return function () {
              var args = _.slice(arguments);
              return fn.apply(pouchdb, args)
                .then(function (res) {
                  if (res.ok) {
                    args[0]._id = res.id;
                    args[0]._rev = res.rev;
                    return args[0];
                  }
                  return $q.reject(res);
                });
            };
          }
        }
      };

      // initialize dbs
      dbs = _.transform(dbs, function (result, opts, name) {
        // creates a pouch db instance that supports angular promises
        var pouchDB = new PouchDB(name, opts);

        var db = _.defaults({
          id               : pouchDB.id,
          info             : _.promisify(pouchDB, pouchDB.info),
          put              : _.promisify(pouchDB, pouchDB.put),
          post             : _.promisify(pouchDB, pouchDB.post),
          get              : _.promisify(pouchDB, pouchDB.get),
          remove           : _.promisify(pouchDB, pouchDB.remove),
          bulkDocs         : _.promisify(pouchDB, pouchDB.bulkDocs),
          allDocs          : _.promisify(pouchDB, pouchDB.allDocs),
          putAttachment    : _.promisify(pouchDB, pouchDB.putAttachment),
          getAttachment    : _.promisify(pouchDB, pouchDB.getAttachment),
          removeAttachment : _.promisify(pouchDB, pouchDB.removeAttachment),
          query            : _.promisify(pouchDB, pouchDB.query),
          compact          : _.promisify(pouchDB, pouchDB.compact),
          revsDiff         : _.promisify(pouchDB, pouchDB.revsDiff),
          destroy          : _.promisify(pouchDB, pouchDB.destroy),

          replicate: {
            to   : _.promisify(pouchDB, pouchDB.replicate.to),
            from : _.promisify(pouchDB, pouchDB.replicate.from),
            sync : _.promisify(pouchDB, pouchDB.replicate.sync)
          },

          save: function () {
            var args = _.slice(arguments);
            if (!_.isEmpty(args) && _.isString(args[0]._id)) {
              return this.put.apply(this, args);
            }
            return this.post.apply(this, args);
          },

          list: function () {
            return this
              .allDocs.apply(this, [{
                include_docs: true
              }])
              .then(function (res) {
                return _.map(res.rows, function (row) {
                  return row.doc;
                });
              });
          },

          changes: function (opts) {
            if (angular.isFunction(opts.onChange)) {
              pouchDB.changes(function (change) {
                $timeout(function () {
                  opts.onChange(change);
                });
              });
            }
          }
        }, defaults);

        _.each(db.hooks, function (hook, name) {
          db[name] = hook(pouchDB, db[name]);
        });

        result[name] = db;
      }, {});

      return dbs;
    }
  };

};
