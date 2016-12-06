import angular from 'angular';
import angularMeteor from 'angular-meteor';
import templateUrl from './roomInfoModal.html';
import {Rooms} from '../../../../imports/collections/rooms';
import {Sessions} from '../../../../imports/collections/sessions';

"use strict";
class RoomInfoModal {


    constructor($uibModal, $reactive, $state, $stateParams, $timeout, $scope) {
        'ngInject';
        $reactive(this).attach($scope);
        RoomInfoModal.instance = this;;

        console.log("$stateParams", $stateParams);
        $uibModal.open({
            templateUrl,
            controller: function($scope, $rootScope) {

                $rootScope.subscribe('rooms');
                $rootScope.subscribe('sessions');

                $rootScope.helpers({
                    getRoom() {
                        return Rooms.findOne({_id: $stateParams.roomId});
                    },
                    getSessions() {
                        var test = Sessions.find({location:"SD3.0.25"});
                        //console.log("test", test);
                        return test.fetch();
                    }
                })
                // $scope.getRoom = function () {
                //     return RoomInfoModal.instance.getRoom();
                // }
                // $scope.getSessions = function () {
                //     return RoomInfoModal.instance.getSessions();
                // }
                $scope.dismiss = function() {
                    $scope.$dismiss();
                };
            },
            /*resolve: {
             items: function () {
             return [1,2,3];
             }
             }*/
        }).result.then(doClosureFn, doDismissFn);

        function doClosureFn() {
            $timeout(function () {
                $state.go('home');
            },100);
        }
        function doDismissFn() {
            return doClosureFn();
        }

    }
}

const name = 'roomInfoModal';

// create a module
export default angular.module(name, [
    angularMeteor
]).directive(name, function roomInfoModalDirective() {
    return {
        //templateUrl,
        //controllerAs: name,
        controller: RoomInfoModal
    }
});