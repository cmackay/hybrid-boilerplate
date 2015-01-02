
'use strict';

/**
 * Module dependencies
 */
var gulp   = require('gulp'),
  gutil    = require('gulp-util'),
  inquirer = require('inquirer'),
  semver   = require('semver'),
  _        = require('../util');

gulp.task('init', function (done) {
  var pkg = _.getPackage(),
    whenContinued = function (answers) {
      return answers.continue;
    };

  inquirer.prompt([{
    type    : 'confirm',
    name    : 'continue',
    message : 'Are you sure you want to initialize the project?',
    default : false
  }, {
    type     : 'input',
    name     : 'name',
    message  : 'Enter the project name?',
    when     : whenContinued,
    default  : pkg.name,
    validate : function (input) {
      var result = require('validate-npm-package-name')(input);
      if (result.valid) {
        return true;
      }
      return result.errors.join(', ');
    }
  }, {
    type     : 'input',
    name     : 'version',
    message  : 'Enter the project version?',
    when     : whenContinued,
    default  : pkg.version,
    validate : function (input) {
      var version = semver.valid(input);
      if (_.isNull(version)) {
        return 'version is not a valid semver';
      }
      return true;
    }
  }, {
    type     : 'input',
    name     : 'repositoryUrl',
    message  : 'Enter the project repository url?',
    when     : whenContinued,
    default  : pkg.repository && pkg.repository.url,
    validate : function (input) {
      return /^https*:\/\/[a-z.\-0-9]+/.test(input) ||
        'repository url is not valid';
    }
  }], function (answers) {
    gutil.log(JSON.stringify(answers, null, ' '));
    done();
  });
});
