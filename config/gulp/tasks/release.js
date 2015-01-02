
'use strict';

/**
 * Module dependencies
 */
var gulp      = require('gulp'),
  gutil       = require('gulp-util'),
  runSequence = require('run-sequence'),
  del         = require('del'),
  path        = require('path'),
  argv        = require('yargs').argv,
  semver      = require('semver'),
  git         = require('git-promise'),
  xeditor     = require('gulp-xml-editor'),
  pages       = require('gulp-gh-pages'),
  bump        = require('gulp-bump'),
  config      = require('../config'),
  _           = require('../util');

// add git utils to lodash
_.mixin(require('git-promise/util'));

// optional args: --major --minor  (default to patch)
gulp.task('release', function (done) {
  process.env.GIT_MERGE_AUTOEDIT = 'no';
  // TODO execute cordova build as part of the release
  runSequence(
    'release:prepare',
    'release:git:start',
    'release:git:publish',
    'release:version:json',
    'release:version:xml',
    'clean',
    'lint',
    'test',
    'build',
    'docs',
    'release:git:commit',
    'release:git:finish',
    'release:git:clean-tmp-repo',
    'release:git:pages',
    _.runCallback(done)
  );
});

gulp.task('release:prepare', function () {
  return git('status --porcelain -b')

    .then(function (output) {
      var status = _.extractStatus(output);

      // verify on develop branch
      if (!/^develop(?:[\.]{3}.*)?$/.test(status.branch)) {
        throw new gutil.PluginError(
          'release:prepare', 'must be in the develop branch');
      }

      // verify no local changes exist
      var localChanges = [];
      _.each(status.workingTree, function (value, key) {
        if (!_.isEmpty(value)) {
          localChanges.push('\n\t' + key + ':', value.join(', '));
        }
      });

      // don't continue if local changes
      if (_.size(localChanges) > 0) {
        throw new gutil.PluginError(
          'release:prepare', 'working tree contains uncommited changes: ' +
          localChanges.join(' '));
      }
    })

    .then(function () {
      // verify latest develop branch
      return git('pull');
    })

    .then(function () {

      // determine current and next version
      var type, current, next;
      if (argv.major) {
        type = 'major';
      } else if (argv.minor) {
        type = 'minor';
      } else {
        type = 'patch';
      }

      // set current and next versions
      current = _.getPackage().version;
      next    = semver.inc(current, type);

      config.version = {
        current : current,
        next    : next
      };
    });
});

gulp.task('release:git:start', function () {
  return git('flow release start ' + config.version.next);
});

gulp.task('release:git:publish', function () {
  return git('flow release publish ' + config.version.next);
});

gulp.task('release:git:commit', function () {
  // commit version with changes
  return git('commit -am v' + config.version.next);
});

gulp.task('release:git:finish', function () {
  // for options refer to:
  // https://github.com/nvie/gitflow/wiki/Command-Line-Arguments
  return git([
      'flow',
      'release',
      'finish',
      '-pm', 'v' + config.version.next,
      config.version.next
    ].join(' '))

    .then(function () {
      return git('push --tags')
        .then(function () {
          // remove local release branch
          return git('branch -d release/' + config.version.next);
        });

    }, function (err) {
      gutil.log(err);
    });
});

gulp.task('release:version:json', function () {
  return gulp.src([
      './package.json',
      './bower.json'
    ])

    // update json versions
    .pipe(bump({
      version: config.version.next
    }))

    .pipe(gulp.dest('.'));
});

gulp.task('release:version:xml', function () {
  return gulp.src('./config.xml')

    // update config.xml version
    .pipe(xeditor(function (xml, xmljs) {
      xml.root().attr({
        version: config.version.next
      });
      return xml;
    }))

    .pipe(gulp.dest('./'));
});

gulp.task('release:git:pages', function () {
  return gulp.src('./release/**/*')
    .pipe(pages());
});

gulp.task('release:git:clean-tmp-repo', function (done) {
  var tmpRepo = path.join(require('os').tmpdir(), 'tmpRepo');
  del([tmpRepo], {force: true, dot: true}, _.runCallback(done));
});
