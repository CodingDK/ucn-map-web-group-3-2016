// import angular from 'angular';
// import angularMeteor from 'angular-meteor';
// import {Classes} from '../../../../imports/collections/classes';
// import {Sessions} from '../../../../imports/collections/sessions';
// import moment from 'moment';
import { name as UcnMapApp } from '../../../main';
import { name as SelectClassModalCtrl} from './selectClassModalWindow';
import 'angular-mocks';
import { assert } from 'meteor/practicalmeteor:chai';
import { sinon } from 'meteor/practicalmeteor:sinon';

describe("selectClassModal", () => {
    beforeEach(() => {
        window.module(UcnMapApp);
    });

    describe('controller', ()=> {
        let ctrl;
        let mockClasses = [{_id: "pwe0916"}];

        beforeEach(() => {
            inject((_$componentController_) => {
                let $componentController = _$componentController_
                ctrl = $componentController(SelectClassModalCtrl, null);
            })
        });

        describe('isClassNameValid()', ()=> {
            it('selectedClass should be null = return false', () => {
                assert.equal(ctrl.isClassNameValid(), false);
            });

            it('selectedClass as valid string className', () => {
                ctrl.getClasses = mockClasses;
                ctrl.selectedClass = "pwe0916";
                assert.equal(ctrl.isClassNameValid(), true);
            });

            it('selectedClass as invalid string className', () => {
                ctrl.getClasses = mockClasses;
                ctrl.selectedClass = "pwe09161";
                assert.equal(ctrl.isClassNameValid(), false);
            });
        });

        describe('isDateValid()', ()=> {
            it('txtDate is init valid', () => {
                assert.equal(ctrl.isDateValid(), true);
            });

            it('txtDate is changed and valid', () => {
                ctrl.txtDate = new Date();
                assert.equal(ctrl.isDateValid(), true);
            });

            it('txtDate is changed and invalid', () => {
                ctrl.txtDate = "INVALID VALUE";
                assert.equal(ctrl.isDateValid(), false);
            });
        });

        describe('openDatePopup()', ()=> {
            it(' sets opened to true', () => {
                assert.equal(ctrl.datePopup.opened, false);
                ctrl.openDatePopup();
                assert.equal(ctrl.datePopup.opened, true);
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