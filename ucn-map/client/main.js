import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {name as LogToServer} from "./logService";
window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
    Meteor.call('logError', [errorMsg, url, lineNumber, column, errorObj]);
}
angular.module('ucn-map', [
  angularMeteor,
    logToServer
]).controller('PartiesListCtrl', ['$scope', function($scope) {
$scope.test = function () {
  t+t;
};
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
}])
    //next is for JsnLog
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('logToServerInterceptor');
    }]);

