import 'angular-mocks';
import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { sinon } from 'meteor/practicalmeteor:sinon';

import '../../../main';

describe("topNavigation", function () {
    describe('component', function() {
        var element;

        beforeEach(function () {
            var $compile;
            var $rootScope;

            window.module("ucn-map-app");

            inject(function (_$compile_, _$rootScope_) {
                $compile = _$compile_;
                $rootScope = _$rootScope_;
            });

            element = $compile('<top-navigation></top-navigation>')($rootScope.$new(true));
            $rootScope.$digest();
        });

        it('first link equals to "UCN-Map"', function () {
            assert.equal(element[0].querySelector('a').innerText, 'UCN-Map');
        });
    });
    describe('controller', function() {
        var $componentController;
        beforeEach(window.module("ucn-map-app"));
        beforeEach(inject(function(_$componentController_) {
            $componentController = _$componentController_;
        }));

        it('default value for isNavCollapsed is true', function() {
            var ctrl = $componentController('topNavigation', null);
            assert.equal(ctrl.isNavCollapsed, true);
        });
        it('toggle set value from true to false', function() {
            var ctrl = $componentController('topNavigation', null);
            assert.equal(ctrl.isNavCollapsed, true);
            ctrl.toggle();
            assert.equal(ctrl.isNavCollapsed, false);
        });
    });
});
