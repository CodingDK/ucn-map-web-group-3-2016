import angular from 'angular';
import angularMeteor from 'angular-meteor';
import moment from 'moment';

class SettingsService {
    _showFreeRooms = true;
    _showLiveData = true;
    _mapTime;// = moment("2016-12-19 08:40").toDate();

    constructor($rootScope) {
        'ngInject';
        this.$rootScope = $rootScope;
        this.setMapTimeToNow(true);
    }

    setMapTimeToNow(isInit = false) {
        let newVal = moment().millisecond(0).seconds(0).toDate();

        if (!isInit) { //use setter so broadcast is been used
            this.mapTime = newVal;
        } else {
            this._mapTime = newVal;
        }
    }

    get showFreeRooms() {
        return this._showFreeRooms
    }

    set showFreeRooms(val) {
        this._showFreeRooms = val;
        this.$rootScope.$broadcast('setting:showFreeRooms', val);
    }


    get showLiveData() {
        return this._showLiveData
    }

    set showLiveData(val) {
        if (val) {
            this.setMapTimeToNow();
        }
        this._showLiveData = val;
        //this.$rootScope.$broadcast('setting:showLiveData', val);
    }

    get mapTime() {
        return this._mapTime;
    }

    set mapTime(val) {
        this._mapTime = val;
        this.$rootScope.$broadcast('setting:mapTime', val);
    }
}

const name = 'settingsService';

export default angular.module(name, [
    angularMeteor
]).service(name, SettingsService);