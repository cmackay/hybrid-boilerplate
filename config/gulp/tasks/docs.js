'use strict';

/**
 * Module dependencies
 */
var gulp      = require('gulp'),
  gutil       = require('gulp-util'),
  fs          = require('fs'),
  runSequence = require('run-sequence'),
  plato       = require('plato'),
  Dgeni       = require('dgeni'),
  todo        = require('gulp-todo'),
  changelog   = require('conventional-changelog'),
  marked      = require('gulp-marked'),
  config      = require('../config'),
  _           = require('../util');

gulp.task('docs', function (done) {
  runSequence(
    'docs:plato',
    'docs:dgeni',
    'docs:todo',
    'docs:changelog',
    'docs:marked',
    _.runCallback(done)
  );
});

gulp.task('docs:plato', function (done) {
  var files   = config.plato.files,
    outputDir = config.plato.outputDir,
    opts = {
      title  : _.getPackage().name,
      jshint : _.getJsHintOptions(true)
    };
  plato.inspect(files, outputDir, opts, function (report) {
    done();
  });
});

gulp.task('docs:dgeni', function () {
  // TODO this needs configuration
  var dgeni = new Dgeni([
    require('../../dgeni/docs.config')
  ]);
  return dgeni.generate();
});

gulp.task('docs:todo', function () {
  return gulp.src(config.sources.js)
    .pipe(todo({

      fileName : 'TODO.md',
      verbose  : config.watch,

      transformComment: function (file, line, text) {
        return [
          '| [' + file + '](' + file + '#L' + line + ') ' +
          '| ' + line + ' | ' + text
        ];
      },

      transformHeader: function (kind) {
        return [
          '### ' + kind + 's',
          '| Filename | Line # | Comment',
          '|:---------|:------:|:-------'
        ];
      }
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('docs:changelog', function (done) {
  var pkg   = _.getPackage();
  if (!(pkg.repository && pkg.repository.url)) {
    throw new gutil.PluginError(
      'docs:changelog', 'repository url not configured in package.json');
  }
  changelog({
    repository : pkg.repository.url,
    version    : pkg.version,
  }, function (err, log) {
    if (err) {
      throw new gutil.PluginError('docs:changelog', err);
    }
    fs.writeFileSync('CHANGELOG.md', log);
    done();
  });
});

gulp.task('docs:marked', function (done) {
  return gulp.src([
      'TODO.md',
      'CHANGELOG.md',
    ])
    .pipe(marked({
      gfm: true
    }))
    .pipe(gulp.dest('./release/'));
});
