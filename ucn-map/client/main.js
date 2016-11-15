import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {name as LogModule} from './logModule';




//window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
    //throw errorObj;
    //Meteor.call('logToServerConsoleWarn', "error: " + msg);
    //try {
        // your code which may throw some errors

    //} catch(ex) {
    //    console.log("rethrow");
        // handle your error and throw again
   // Kadira.trackError("client error?", errorMsg);

    //}
//};

var app = angular.module('ucn-map', [
  angularMeteor,
    LogModule
]).controller('PartiesListCtrl', ['$scope', function($scope) {
  $scope.makeError = function () {
      console.log('clicked angular error');
      t+t;
  },
  $scope.parties = [{
    'name': 'Dubstep-Free Zone',
    'description': 'Can we please just for an evening not listen to dubstep.'
  }, {
    'name': 'All dubstep all the time',
    'description': 'Get it on!'
  }, {
    'name': 'Savage lounging',
    'description': 'Leisure suit required. And only fiercest manners.'
  }];
}]);
