
'use strict';

/**
 * Module dependencies
 */
var fs     = require('fs'),
  path     = require('path'),
  _        = require('lodash'),
  istanbul = require('istanbul'),
  fsTools  = require('fs-tools'),
  cache    = {};

var instrumenter = new istanbul.Instrumenter({
  embedSource : true,
  noAutoWrap  : true
});

module.exports = {

  configureWebpack: function (webpackConfig) {
    // copy webpackConfig
    webpackConfig = _.merge({}, webpackConfig);
    webpackConfig.cache = true;
    if (!webpackConfig.resolveLoader) {
      webpackConfig.resolveLoader = {};
    }
    webpackConfig.resolveLoader.modulesDirectories = [
      'node_modules', './config/loaders'
    ];
    if (!_.isArray(webpackConfig.module.postLoaders)) {
      webpackConfig.module.postLoaders = [];
    }
    webpackConfig.module.postLoaders.push({
      test    : /\.js$/,
      exclude : [
        /node_modules\//,
        /bower_components\//,
        /config\/test\//,
        /\.spec\.js$/
      ],
      loader: 'instrument'
    });
    return webpackConfig;
  },

  plugin: function (opts) {
    var self = this;
    var PreloadPlugin = function (config) {
      config.webpack = self.configureWebpack(config.webpack);
      if (opts.preloadSources) {
        self.preloadSources(opts.preloadSources);
      }
      // this adds any sources that were not explicitely required
      // so that accurate coverage percentages are reported
      this.onBrowserComplete = function (browser, result) {
        if (!result.coverage) {
          return;
        }
        self.eachEntry(function (value, key) {
          if (!result.coverage[key]) {
            result.coverage[key] = value.coverage;
          }
        });
      };
    };
    PreloadPlugin.$inject = ['config'];
    return {
      // TODO maybe extend karma-coverage so that this is not necessary
      'reporter:add-preloaded' : ['type', PreloadPlugin]
    };
  },

  instrument: function (source, resourcePath) {
    var info = cache[resourcePath];
    if (!info) {
      info = {};
      info.instrumented = instrumenter.instrumentSync(source, resourcePath);
      info.coverage = instrumenter.lastFileCoverage();
      cache[resourcePath] = info;
    }
    return info.instrumented;
  },

  preloadSources: function (baseDir, opts) {
    opts = opts || {
      pattern  : /\.js$/,
      excluded : /\.spec\.js$/
    };
    var self = this;
    fsTools.walkSync(baseDir, opts.pattern, function (filepath) {
      if (opts.excluded && !opts.excluded.test(filepath)) {
        var absolutePath = path.resolve(filepath);
        var source = fs.readFileSync(absolutePath, {encoding: 'utf8'});
        self.instrument(source, absolutePath);
      }
    });
  },

  eachEntry: function (callback) {
    _.each(cache, callback);
  },

  clearEntries: function () {
    cache = {};
  }

};
