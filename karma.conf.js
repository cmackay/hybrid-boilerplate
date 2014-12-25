
'use strict';

// Karma configuration
module.exports = function(config) {

  config.set({

    basePath   : './',

    frameworks : ['jasmine'],
    reporters  : ['spec'],
    browsers   : ['PhantomJS'],

    singleRun : false,
    colors    : true,
    autoWatch : true,
    logLevel  : config.LOG_INFO,

    port           : 9876,
    captureTimeout : 60000,

    files: [
      'app/**/*.spec.js'
    ],

    preprocessors: {
      '*.spec.js': [
        'webpack',
        'sourcemap'
      ]
    },

    webpack: {
      watch   : true,
      devtool : 'inline-source-map'
    },

    webpackServer: {
      stats: {
        colors: true
      }
    },

    plugins: [
      require('karma-jasmine'),
      require('karma-phantomjs-launcher'),
      require('karma-webpack'),
      require('karma-spec-reporter')
    ]

  });
};
