
'use strict';

/**
 * Module dependencies
 */
var gulp = require('gulp'),
  del    = require('del'),
  _      = require('../util');

gulp.task('clean', function (done) {
  del([
    'release',
    'www/**/*',
    '!www/.gitignore',
  ], {
    dot: true
  }, _.runCallback(done));
});

gulp.task('clean-all', function (done) {
  del([
    'release',
    'www/**/*',
    '!www/.gitignore',
    'node_modules',
    'bower_components'
  ], {
    dot: true
  }, _.runCallback(done));
});
