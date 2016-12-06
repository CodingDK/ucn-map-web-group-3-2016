import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Rooms} from '../../../../imports/collections/rooms';
import {Sessions} from '../../../../imports/collections/sessions';

class RoomInfoModalCtrl {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        $reactive(this).attach($scope);
        console.log("$stateParams", $stateParams);
        this.subscribe('rooms');
        this.subscribe('sessions');

        this.roomName = $stateParams.roomId;

        this.helpers({
            room: () => {
                return Rooms.findOne({_id: this.roomName});
            },
            sessions: () => {
                var test = Sessions.find({location:this.roomName});
                //console.log("test", test);
                return test;
            }
        })
        // $scope.getRoom = function () {
        //     return RoomInfoModal.instance.getRoom();
        // }
        // $scope.getSessions = function () {
        //     return RoomInfoModal.instance.getSessions();
        // }
        this.dismiss = function() {
            $scope.$dismiss();
        };
    }
}

const name = 'roomInfoModalCtrl';

export default angular.module(name, [
    angularMeteor
]).controller(name, RoomInfoModalCtrl);