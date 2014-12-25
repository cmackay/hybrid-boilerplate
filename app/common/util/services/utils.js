
'use strict';

var ionic = require('ionic/js/ionic'),
  _       = require('lodash');

/**
 * @class _
 * @classdesc adds utilities as mixins to lodash
 * @ngInject
 */
module.exports = function ($q, $log, $timeout) {

  _.mixin({

    slice: function (obj) {
      return Array.prototype.slice.call(obj, 0);
    },

    promisify: function (obj, fn) {
      return function () {
        var deferred = $q.defer(),
          args = arguments ? _.slice(arguments) : [];
        args.push(function (err, res) {
          $timeout(function () {
            if (err) {
              $log.warn('promisify - err', {
                fn   : fn,
                args : args,
                err  : err
              });
              return deferred.reject(err);
            }
            deferred.resolve(res);
          });
        });
        fn.apply(obj, args);
        return deferred.promise;
      };
    },

    resettingCounter: function (ms, callback) {
      var count = 0;
      var reset = _.debounce(function () {
        count = 0;
      }, ms);
      return function () {
        count++;
        callback(count);
        reset();
      };
    }

  });

  return _;

};
