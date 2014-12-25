
'use strict';

/**
* Module dependencies
*/
var gulp      = require('gulp'),
  runSequence = require('run-sequence'),
  browserSync = require('browser-sync'),
  config      = require('../config'),
  _           = require('../util');

gulp.task('watch', function (done) {
  runSequence(
    'watch:set',
    'build',
    'watch:browser-sync',
    'test',
    _.runCallback(done)
  );
});

gulp.task('watch:set', function () {
  config.watch = true;
});

gulp.task('watch:browser-sync', function () {
  browserSync({
    files: [
    'www/**'
    ],
    server: {
      baseDir : ['www'],
      index   : 'index.html'
    }
  });
});
