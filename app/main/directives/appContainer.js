
'use strict';

/**
 * @class AppContainer
 * @classdesc The app container
 * @ngInject
 */
module.exports = function AppContainer () {

  return {
    restrict : 'C',
    template : require('./appContainer.html')
  };

};
