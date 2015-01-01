
'use strict';

if (!Function.prototype.bind) {
  // required for pouchdb which uses the bind function
  // add bind function to phantomjs or other browsers not supporting toBind
  // refer to: http://stackoverflow.com/questions/24971148/setup-karma-unit-tests-with-pouchdb
  Function.prototype.bind = function (obj) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError(
        'Function.prototype.bind - what is trying to be bound is not callable');
    }

    var args = Array.prototype.slice.call(arguments, 1),
      toBind = this,
      NoOp = function () {},
      Bound = function () {
        return toBind.apply(this instanceof NoOp &&
          obj ? this : obj,
          args.concat(Array.prototype.slice.call(arguments)));
      };

    NoOp.prototype = this.prototype;
    Bound.prototype = new NoOp();
    return Bound;
  };
}
