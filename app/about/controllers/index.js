
'use strict';

/**
 * @class AboutIndexCtrl
 * @classdesc The about index
 * @ngInject
 */
function AboutIndexCtrl ($log, $window, appVersion, app, _) {

  var vm = this;

  vm.title = 'About';
  vm.appVersion = appVersion;
  vm.showDebug = false;

  vm.clickVersion = _.resettingCounter(2000, function (count) {
    if (count === 5) {
      vm.showDebug = !vm.showDebug;
    }
  });

  vm.resetData = function () {
    app.resetData()
      .then(function () {
        $window.location.reload();
      });
  };

}

AboutIndexCtrl.template = require('./index.html');

AboutIndexCtrl.resolve = {
};

module.exports = AboutIndexCtrl;
