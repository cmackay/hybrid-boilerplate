
'use strict';

/**
 * Module dependencies
 */
var fs   = require('fs'),
  path   = require('path'),
  notify = require('gulp-notify');

// don't need duplicated error messages
notify.logLevel(0);

// load the tasks
fs.readdirSync('./config/gulp/tasks/')
  .filter(function (name) {
    return /(\.(js)$)/i.test(path.extname(name));
  })
  .forEach(function (task) {
    require(path.resolve('./config/gulp/tasks/', task));
  });
