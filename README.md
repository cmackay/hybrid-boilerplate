hybrid-boilerplate
=============

## Overview

Provides a basic hyprid starter application using [Ionic](http://ionicframework.com/), [Webpack](http://webpack.github.io/) and many other technologies. The main goals are to provide a commonjs application structure along with many of the common build tasks required for a project.

### Application Libraries:
* [Ionic](http://ionicframework.com/) - Hybrid Framework
* [Angular](http://angularjs.org) - App Framework
* [PouchDB](http://pouchdb.com) - used in example notes app to store and query local data

### Build Libraries:
* [Gulp](http://gulpjs.com/) - Build System
* [JSCS](https://github.com/jscs-dev/node-jscs) - JavaScript Style Checker
* [JSHint](http://jshint.com/) - JavaScript Linter
* [webpack](http://webpack.github.io/) - Module Bundler
* [Karma](http://karma-runner.github.io/) - Test Runner
* [BrowserSync](http://www.browsersync.io/) - Browser Testing and Live Reloading
* [Plato](https://github.com/es-analysis/plato) - Code Analysis Reporting
* [conventional-changelog](https://github.com/ajoslin/conventional-changelog) - Automatic changelog generation from git commits
* [Dgeni](https://github.com/angular/dgeni) - Documentation Generator
* [gulp-todo](https://www.npmjs.com/package/gulp-todo) - Generates markdown page from TODO messages in source scripts
* [GitFlow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) - Git workflow for managing branching and releases
* [gulp-gh-pages](https://github.com/rowoot/gulp-gh-pages) - GitHub gh-pages site generation

The above represents a partial list of some of the libraries used. For a complete list of dependencies, refer to the [package.json](package.json) and [bower.json](bower.json).

### Generated Changelog and TODOs
* [CHANGELOG](CHANGELOG.md)
* [TODO](TODO.md)

## Quick Start

Fork and clone the repository

```bash
$ git clone <your_fork>
```

Install the dependencies

```bash
$ npm install
```

Initialize project settings (TODO)

```bash
$ gulp init
```

Watch Mode (this will watch the webpack bundle and run browser-sync)

```bash
$ gulp watch
```

Release Mode (git flow release, updates versions, docs and gh-pages site)

```bash
$ gulp release [--major || --minor]
```
Optionally a major or minor argument can be passed to represent a major or minor release. By default release will do a patch release incrementing the last part of the version. The version consists of the following parts: MAJOR.MINOR.PATCH. If gulp release is run with no arguments and the version is 1.0.0, it would increment to 1.0.1.

Adding Cordova Plugins

```bash
$ cordova plugins add com.ionic.keyboard org.apache.cordova.console org.apache.cordova.device
```

Adding Cordova Platforms

```bash
$ cordova platform add ios
```

Build

```bash
$ gulp && cordova build
```

Running in the emulator

```bash
$ cordova emulate ios
```
