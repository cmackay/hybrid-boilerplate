
'use strict';

/**
 * Module dependencies
 */
var gulp      = require('gulp'),
  runSequence = require('run-sequence'),
  karma       = require('karma').server,
  path        = require('path'),
  config      = require('../config'),
  _           = require('../util');

gulp.task('test', function (done) {
  runSequence(
    'test:karma',
    _.runCallback(done)
  );
});

gulp.task('test:karma', function (done) {
  karma.start({

    configFile : path.join(config.base, 'karma.conf.js'),
    singleRun  : !config.watch,
    autoWatch  : config.watch

  }, function (exitCode) {
    if (exitCode !== 0) {
      return process.exit(exitCode);
    }

    done();
  });
});
