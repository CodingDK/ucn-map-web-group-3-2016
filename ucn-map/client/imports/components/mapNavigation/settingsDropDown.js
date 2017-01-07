import angular from 'angular';
import angularMeteor from 'angular-meteor';
import templateUrl from './settingsDropDown.html';
import moment from 'moment';

"use strict";
/**
 * Controller for the settingsDropDown
 */
class SettingsDropDownCtrl {
    constructor($scope, $reactive, settingsService, Notification) {
        'ngInject';
        $reactive(this).attach($scope);
        this.Notification = Notification;
        this.settings = settingsService;
        this.resetFormTime();
    }

    resetFormTime() {
        this.formTime = this.settings.mapTime;
    }

    toggleShowFreeRoom() {
        this.settings.showFreeRooms = !this.settings.showFreeRooms;
    }

    toggleShowLiveData() {
        this.resetFormTime();
        this.settings.showLiveData = !this.settings.showLiveData;
    }

    changeMapTime() {
        let newTime = moment(this.formTime);
        if (newTime.isValid()) {
            this.settings.mapTime = newTime.toDate();
        } else {
            this.Notification.info({message: 'Timeformat is invalid', title: 'Invalid timeformat'});
        }
    }
}

const name = 'settingsDropDown';

// create a module
export default angular.module(name, [
    angularMeteor
]).component(name, {
    templateUrl,
    controllerAs: "ctrl",
    controller: SettingsDropDownCtrl,
    bindings: {
        close: "&"
    }
});
