
'use strict';

/**
 * Module dependencies
 */
var gulp      = require('gulp'),
  gutil       = require('gulp-util'),
  runSequence = require('run-sequence'),
  gulpif      = require('gulp-if'),
  plumber     = require('gulp-plumber'),
  jshint      = require('gulp-jshint'),
  jscs        = require('gulp-jscs'),
  notify      = require('gulp-notify'),
  config      = require('../config'),
  _           = require('../util');

gulp.task('lint', function (done) {
  runSequence(
    'lint:jscs',
    'lint:jshint',
    _.runCallback(done)
  );
});

gulp.task('lint:jshint', function () {
  return gulp.src(config.sources.js)
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-summary', {
      fileColCol  : ',bold',
      positionCol : ',bold',
      codeCol     : 'green,bold',
      reasonCol   : 'cyan'
    }))
    .pipe(gulpif(!config.watch, jshint.reporter('fail')));
});

gulp.task('lint:jscs', function () {
  return gulp.src(config.sources.js)
    .pipe(plumber({
      errorHandler: notify.onError({
        message: '<%= options.strip(error.message) %>',
        templateOptions: {
          strip: gutil.colors.stripColor
        }
      })
    }))
    .pipe(jscs('.jscsrc'));
});

gulp.task('lint:jscs:watch', function () {
  gulp.watch(config.sources.js, ['jscs']);
});
