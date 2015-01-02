
'use strict';

/**
 * Module dependencies
 */
var gulp   = require('gulp'),
  gutil    = require('gulp-util'),
  inquirer = require('inquirer'),
  semver   = require('semver'),
  os       = require('os'),
  url      = require('url'),
  git      = require('git-promise'),
  xeditor  = require('gulp-xml-editor'),
  _        = require('../util');

var getRemoteOrigin = function () {
  return git('remote show origin')
    .then(function (stdout) {
      var lines = stdout.split(os.EOL);
      var fetchUrlPattern = /Fetch URL\:/;
      var remoteOrigin;
      lines.forEach(function (line) {
        if (fetchUrlPattern.test(line)) {
          remoteOrigin = line.replace(fetchUrlPattern, '').trim();
        }
      });
      return remoteOrigin;
    });
};

var getDefaults = function (remoteOrigin) {
  var remoteUrl   = url.parse(remoteOrigin),
    remotePath    = remoteUrl.pathname.split('/'),
    repositoryUrl = remoteOrigin.replace(/\.git/, ''),
    username      = remotePath[1],
    projectName   = remotePath[2].replace(/\.git/, '');

  var cordovaId = remoteUrl.hostname.split('.').reverse();
  // add user to id
  cordovaId.push(username);
  // add project name to id
  cordovaId.push(projectName.replace('-', '_'));

  return {
    repositoryUrl : repositoryUrl,
    username      : username,
    name          : projectName,
    cordovaId     : cordovaId.join('.'),
    version       : '0.0.0',
    authorUrl     : repositoryUrl,
    authorName    : projectName + ' team',
    authorEmail   : username + '@users.noreply.github.com'
  };
};

var inquire = function (remoteOrigin, callback) {
  var defaults    = getDefaults(remoteOrigin),
    whenContinued = function (answers) {
      return answers.continue;
    };

  inquirer.prompt([{
    type    : 'confirm',
    name    : 'continue',
    message : 'Are you sure you want to initialize the project',
    default : false
  }, {
    type     : 'input',
    name     : 'name',
    message  : 'Enter the project name',
    when     : whenContinued,
    default  : defaults.name,
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
    message  : 'Enter the project version',
    when     : whenContinued,
    default  : defaults.version,
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
    message  : 'Enter the project repository url',
    when     : whenContinued,
    default  : defaults.repositoryUrl,
    validate : function (input) {
      return /^https*:\/\/[a-z.\-0-9]+/.test(input) ||
      'repository url is not valid';
    }
  }, {
    type     : 'input',
    name     : 'cordovaId',
    message  : 'Enter the cordova project id',
    when     : whenContinued,
    default  : defaults.cordovaId
  }, {
    type     : 'input',
    name     : 'authorUrl',
    message  : 'Enter the author url',
    when     : whenContinued,
    default  : defaults.authorUrl
  }, {
    type     : 'input',
    name     : 'authorName',
    message  : 'Enter the author name',
    when     : whenContinued,
    default  : defaults.authorName
  }, {
    type     : 'input',
    name     : 'authorEmail',
    message  : 'Enter the author email',
    when     : whenContinued,
    default  : defaults.authorEmail
  }], callback);
};

gulp.task('init', function (done) {
  getRemoteOrigin()
    .then(function (remoteOrigin) {
      inquire(remoteOrigin, function (answers) {
        if (answers.continue) {
          // update package json
          _.updateJson('package.json', function (json) {
            json.name = answers.name;
            json.version = answers.version;
            json.repository.url = answers.repositoryUrl;
            return json;
          });
          // update bower json
          _.updateJson('bower.json', function (json) {
            json.name = answers.name;
            json.version = answers.version;
            return json;
          });
          // update cordova config
          gulp.src('./config.xml')
            .pipe(xeditor(function (xml, xmljs) {
              xml.root()
                .attr({
                  id      : answers.cordovaId,
                  version : answers.version
                })
                .get('//*[local-name()=\'name\']')
                  .text(answers.name)
                  .parent()
                .get('//*[local-name()=\'description\']')
                  .text(answers.name)
                  .parent()
                .get('//*[local-name()=\'author\']')
                  .text(answers.authorName)
                  .attr({
                    email : answers.authorEmail,
                    href  : answers.authorUrl
                  });
              return xml;
            }))
            .pipe(gulp.dest('./'));
        }
        done();
      });
    });
});
