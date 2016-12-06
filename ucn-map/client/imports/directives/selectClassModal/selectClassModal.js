import angular from 'angular';
import angularMeteor from 'angular-meteor';
import templateUrl from "./selectClassModal.html";
import {name as SelectClassModalCtrl} from './selectClassModalCtrl';

class SelectClassModalDirective {
    constructor($uibModal, $state, $timeout) {
        'ngInject';

        $uibModal.open({
            templateUrl,
            controller: SelectClassModalCtrl,
            size: "sm",
            //component: 'modalComponent',
            /*resolve: {
             items: function () {
             return [1,2,3];
             }
             }*/
            controllerAs: "ctrl",
            //bindToController: true,
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

const name = 'selectClassModal';

// create a module
export default angular.module(name, [
    angularMeteor,
    SelectClassModalCtrl
]).directive(name, function() {
    return {
        //templateUrl,
        controller: SelectClassModalDirective
    }
});