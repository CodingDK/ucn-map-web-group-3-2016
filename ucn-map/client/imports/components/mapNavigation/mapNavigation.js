import angular from 'angular';
import angularMeteor from 'angular-meteor';
import templateUrl from './mapNavigation.html';
import {name as SettingsDropDown} from './settingsDropDown';

import uiRouter from 'angular-ui-router';
"use strict";
/**
 * Controller for the navigation in top and bottom of pages
 */
class NavCtrl {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.isSettingsCollapsed = true;
    }

    toggleSettings() {
        this.isSettingsCollapsed = !this.isSettingsCollapsed;
    };
}

const name = 'mapNavigation';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    SettingsDropDown
]).component(name, {
    templateUrl,
    controllerAs: "ctrl",
    controller: NavCtrl
});
