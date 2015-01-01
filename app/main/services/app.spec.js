
'use strict';

var angular = require('angular');

require('angular-mocks/angular-mocks');

describe('app.main module', function() {

  var app;

  beforeEach(angular.mock.module(require('../index').name));

  describe('app service', function () {
    beforeEach(angular.mock.inject(function (_app_) {
      app = _app_;
    }));
    describe('when getNotes is called', function () {
      it('should return notes', function () {
      });
    });
  });

});
