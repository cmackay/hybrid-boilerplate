
'use strict';

/**
* Module dependencies
*/
var path = require('path');

module.exports = {

  base  : process.cwd(),
  watch : false,

  sources: {
    js: [
      '**/*.js',
      '!node_modules/**',
      '!bower_components/**',
      '!hooks/**',
      '!www/**',
      '!release/**'
    ]
  },

  plato: {
    files: [
      'app/**/*.js'
    ],
    outputDir: 'release/plato'
  }

};
