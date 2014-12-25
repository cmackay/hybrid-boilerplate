
'use strict';

var path = require('path');

exports.config = {

  // Spec patterns are relative to the location of the spec file. They may
  // include glob patterns.
  specs: [
    path.resolve('app/**/*.scenario.js')
  ],

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {

    showColors : true,
    isVerbose  : true,

    defaultTimeoutInterval: 120000
  },

  baseUrl: 'http://localhost:' + 8876,

  onPrepare: function() {
  }

};
