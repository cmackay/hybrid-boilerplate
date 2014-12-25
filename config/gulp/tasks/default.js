
'use strict';

/**
* Module dependencies
*/
var gulp      = require('gulp'),
  runSequence = require('run-sequence'),
  _           = require('../util');

gulp.task('default', function (done) {
  runSequence(
    'clean',
    'lint',
    'test',
    'build',
    _.runCallback(done)
  );
});
