
'use strict';

var _           = require('lodash'),
  webpackConfig = require('./webpack.config'),
  instrumenter  = require('./config/test/instrumenter');

// Karma configuration
module.exports = function (config) {

  config.set({

    basePath   : '',

    frameworks : ['jasmine'],
    browsers   : ['PhantomJS'],

    colors    : true,
    logLevel  : config.LOG_INFO,

    port           : 9876,
    captureTimeout : 60000,

    files: [
      'config/test/helpers.js',
      'app/**/*.spec.js'
    ],

    preprocessors: {
      'app/**/*.spec.js': [
        'webpack'
      ]
    },

    reporters: [
      'spec',
      'add-preloaded',
      'coverage'
    ],

    coverageReporter: {
      type: 'html',
      dir: 'release/coverage'
    },

    webpack: webpackConfig,

    webpackServer: {
      stats: {
        colors: true
      },
      quiet: true
    },

    plugins: [
      instrumenter.plugin({
        preloadSources: 'app'
      }),
      require('karma-webpack'),
      require('karma-coverage'),
      require('karma-jasmine'),
      require('karma-phantomjs-launcher'),
      require('karma-spec-reporter')
    ]

  });
};
