
'use strict';

/**
* Module dependencies
*/
var gulp        = require('gulp'),
  gutil         = require('gulp-util'),
  browserSync   = require('browser-sync'),
  runSequence   = require('run-sequence'),
  webpack       = require('webpack'),
  webpackConfig = require('../../../webpack.config'),
  config        = require('../config'),
  _             = require('../util');

gulp.task('build', function (done) {
  runSequence(
    'build:webpack',
    _.runCallback(done)
  );
});

gulp.task('build:webpack', function (done) {
  if (config.devtool) {
    webpackConfig.devtool = config.devtool;
  }
  var started = false,
    bundler   = webpack(webpackConfig);

  function bundle (err, stats) {
    if (err) {
      throw new gutil.PluginError('build:webpack', err);
    }

    gutil.log('[build:webpack]', stats.toString({
      colors: true
    }));

    if (config.watch) {
      browserSync.reload(webpackConfig.output.filename);
    }

    if (!started) {
      started = true;
      return done();
    }
  }

  if (config.watch) {
    bundler.watch(200, bundle);

  } else {
    bundler.run(bundle);
  }
});
