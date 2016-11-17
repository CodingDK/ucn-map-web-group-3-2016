import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiBootstrap from 'angular-ui-bootstrap'
import {name as logException} from './imports/factories/logException';
import {name as TopNavigation} from './imports/components/topNavigation/topNavigation';

var app = angular.module('ucn-map', [
    angularMeteor,
    logException,
    uiBootstrap,
    TopNavigation
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