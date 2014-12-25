hybrid-boilerplate
=============

## Quick Start

Clone the repository

```bash
$ git clone https://github.com/cmackay/hybrid-boilerplate.git
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
