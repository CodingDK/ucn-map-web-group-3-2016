import angular from 'angular';
import angularMeteor from 'angular-meteor';
import templateUrl from './topNavigation.html';
"use strict";
/**
 * Controller for the navigation in top of pages
 */
class NavCtrl {
    constructor($scope, $reactive) {
        'ngInject';
        //$reactive(this).attach($scope);
        $scope.isNavCollapsed = true;

        $scope.toggle = function() {
            $scope.isNavCollapsed = !$scope.isNavCollapsed;
        };
    }
}

const name = 'topNavigation';

// create a module
export default angular.module(name, [
    angularMeteor
]).component(name, {
    templateUrl,
    controllerAs: name,
    controller: NavCtrl
});
