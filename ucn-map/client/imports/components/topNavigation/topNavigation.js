import angular from 'angular';
import angularMeteor from 'angular-meteor';
import templateUrl from './topNavigation.html';

import uiRouter from 'angular-ui-router';
"use strict";
/**
 * Controller for the navigation in top of pages
 */
class NavCtrl {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.isNavCollapsed = true;
    }

    toggle = function() {
        this.isNavCollapsed = !this.isNavCollapsed;
    };
}

const name = 'topNavigation';

// create a module
export default angular.module(name, [
   angularMeteor,
   uiRouter
]).component(name, {
    templateUrl,
    //controllerAs: name,
    controller: NavCtrl
});
