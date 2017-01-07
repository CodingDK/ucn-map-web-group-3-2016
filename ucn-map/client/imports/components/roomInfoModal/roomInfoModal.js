import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {name as RoomInfoModalWindow} from './roomInfoModalWindow';

class RoomInfoModalDirective {


    constructor($uibModal, $state, $timeout) {
        'ngInject';

        $uibModal.open({
            component: RoomInfoModalWindow
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
    RoomInfoModalWindow
]).directive(name, function roomInfoModalDirective() {
    return {
        //templateUrl,
        //controllerAs: name,
        controller: RoomInfoModalDirective
    }
});