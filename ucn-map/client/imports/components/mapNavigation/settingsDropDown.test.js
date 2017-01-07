import { name as UcnMapApp } from '../../../main';
import { name as SettingsDropDown} from './settingsDropDown';
import 'angular-mocks';
import { assert } from 'meteor/practicalmeteor:chai';
import { sinon } from 'meteor/practicalmeteor:sinon';
import moment from 'moment';

describe("SettingsDropDown", () => {
    beforeEach(() => {
        window.module(UcnMapApp);
    });

    describe('controller', ()=> {
        //let $componentController;
        let ctrl;

        beforeEach(() => {
            inject(($rootScope, _$componentController_) => {
                //let scope = $rootScope.$new();
                let $componentController = _$componentController_;
                ctrl = $componentController(SettingsDropDown, null);
                /*{$scope:scope}, { close: () => {} }*/
            });
        });

        describe('resetFormTime()', () => {
            it('formTime is defined and a Date', () => {
                assert.equal(typeof ctrl.formTime === "undefined", false);

                assert.equal(moment(ctrl.formTime).isValid(), true, "should be valid");
                ctrl.formTime = "INVALID";
                assert.equal(moment(ctrl.formTime, "MM-DD-YYYY").isValid(), false, "should be invalid");

            });
            it('formTime should be equals to mapTime', () => {
                ctrl.formTime = moment().toDate();
                assert.notEqual(ctrl.formTime, ctrl.settings.mapTime);
                ctrl.resetFormTime();
                assert.equal(ctrl.formTime, ctrl.settings.mapTime);
            });
        });

        describe('toggleShowFreeRoom()', () => {
            it('value should be changed in service', () => {
                let serviceVal = ctrl.settings.showFreeRooms;
                assert.equal(ctrl.settings.showFreeRooms, serviceVal);
                ctrl.toggleShowFreeRoom();
                assert.equal(ctrl.settings.showFreeRooms, !serviceVal);
            });
        });

        describe('toggleShowLiveData()', () => {
            it('value should be changed in service', () => {
                let serviceVal = ctrl.settings.showLiveData;
                assert.equal(ctrl.settings.showLiveData, serviceVal);
                ctrl.toggleShowLiveData();
                assert.notEqual(ctrl.settings.showLiveData, serviceVal);
            });
            it('formTime should be reset', () => {
                ctrl.formTime = "Invalid";
                ctrl.toggleShowLiveData();
                assert.equal(ctrl.formTime, ctrl.settings.mapTime);
            });
        });

        describe('changeMapTime()', () => {
            it('formTime is valid = mapTime should be changed in service', () => {
                let newTime = moment();
                ctrl.formTime = newTime.toDate();
                ctrl.changeMapTime();
                assert.equal(newTime.isSame(ctrl.settings.mapTime), true);
            });
            it('formTime is invalid = mapTime should not be changed in service', () => {
                ctrl.formTime = "Invalid";
                let old_console_warn = console.warn; //disabled to hide moment warning
                console.warn = () => {};             //see http://momentjs.com/guides/#/warnings/js-date/ for more info
                ctrl.changeMapTime();
                console.warn = old_console_warn; //reset console.warn
                assert.equal(moment(ctrl.settings.mapTime).isValid(), true);
            });
        });
    });
});


function printObj(obj) {
    let seen = [];
    let jsonObj = JSON.stringify(obj, (key, val) => {
        if (val != null && typeof val == "object") {
            if (seen.indexOf(val) >= 0) {
                return;
            }
            seen.push(val);
        }
        return val;
    });
    console.log("printObj: ", jsonObj);
}