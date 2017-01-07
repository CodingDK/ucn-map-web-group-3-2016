import 'angular-mocks';
import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { sinon } from 'meteor/practicalmeteor:sinon';

import {name as UcnMapApp} from '../../../main';
import {name as MapNavigation} from './mapNavigation';

describe("mapNavigation", () => {
    beforeEach(() => {
        window.module(UcnMapApp);
    });
    describe('component', () => {
        let element;

        beforeEach(() => {
            let $compile;
            let $rootScope;

            inject((_$compile_, _$rootScope_) => {
                $compile = _$compile_;
                $rootScope = _$rootScope_;
            });

            element = $compile('<map-navigation></map-navigation>')($rootScope.$new(true));
            $rootScope.$digest();
        });

        it('mapNavigation is defined', () => {
            assert.isDefined(element[0], 'map-navigation is defined');
        });
    });
    describe('controller', ()=> {
        let ctrl;

        beforeEach(() => {
            inject((_$componentController_) => {
                let $componentController = _$componentController_
                ctrl = $componentController(MapNavigation, null);
            })
        });

        it('default value for isSettingsCollapsed is true', () => {
            assert.equal(ctrl.isSettingsCollapsed, true);
        });
        it('toggleSettings set value from true to false', () => {
            assert.equal(ctrl.isSettingsCollapsed, true);
            ctrl.toggleSettings();
            assert.equal(ctrl.isSettingsCollapsed, false);
        });
    });
});
