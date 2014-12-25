
'use strict';

/**
* @class  $exceptionHandler
* @classdesc The $exceptionHandler
* @ngInject
*/
module.exports = function $exceptionHandler () {

  return function(exception) {
    throw exception;
  };

};
