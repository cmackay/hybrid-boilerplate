hybrid-boilerplate
=============

## Overview

Provides a hyprid application starter project using [Ionic](http://ionicframework.com/), [Webpack](http://webpack.github.io/) and many other technologies. Along with providing a basic commonjs structure for application code, the project also provides many of the common build tasks needed for projects. This includes live reloading using [BrowserSync](http://www.browsersync.io/), [Karma](http://karma-runner.github.io/) for test running,
[jscs](https://github.com/jscs-dev/node-jscs) & [jshint](http://jshint.com/) for style and lint checking,
code reports using [Plato](https://github.com/es-analysis/plato),
[conventional-changelog](https://github.com/ajoslin/conventional-changelog) for automatic change log generation,
[Dgeni](https://github.com/angular/dgeni) for generating docs, [GitFlow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) for deploying new releases,
[gulp-gh-pages](https://github.com/rowoot/gulp-gh-pages) github user site generation, and many other tasks. This is a work in progress so some features are not yet fully implemented.

For a complete list of dependencies, refer to the [package.json](package.json) and [bower.json](bower.json).

### Recent Changes
[CHANGELOG.md](CHANGELOG.md)

### TODOs
[TODO.md](TODO.md)

## Quick Start

Fork and clone the repository

```bash
$ git clone <your_fork>
```

Install the dependencies

```bash
$ npm install
```

Watch Mode (this will watch the webpack bundle and run browser-sync)

```bash
$ gulp watch
```

Release Mode (git flow release, updates versions, docs and gh-pages site)

```bash
$ gulp release
```

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
