
'use strict';

var instrumenter = require('../test/instrumenter');

module.exports = function (source) {
  if (this.cacheable) {
    this.cacheable();
  }
  return instrumenter.instrument(source, this.resourcePath);
};
