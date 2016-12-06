import angular from 'angular';
import angularMeteor from 'angular-meteor';
import templateUrl from './roomInfoModal.html';
import {name as RoomInfoModalCtrl} from './roomInfoModalCtrl';

class RoomInfoModal {


    constructor($uibModal, $state, $timeout) {
        'ngInject';

        $uibModal.open({
            templateUrl,
            controller: RoomInfoModalCtrl,
            controllerAs: "ctrl"
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
    angularMeteor,
    RoomInfoModalCtrl
]).directive(name, function roomInfoModalDirective() {
    return {
        //templateUrl,
        //controllerAs: name,
        controller: RoomInfoModal
    }
});