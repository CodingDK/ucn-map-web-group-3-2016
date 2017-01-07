import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {name as SelectClassModalWindow} from './selectClassModalWindow';

class SelectClassModalDirective {
    constructor($uibModal, $state, $timeout) {
        'ngInject';

        $uibModal.open({
            //templateUrl,
            //controller: SelectClassModalWindow,
            size: "sm",
            component: SelectClassModalWindow,
            /*resolve: {
             items: function () {
             return [1,2,3];
             }
             }*/
            //controllerAs: "ctrl",
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
    SelectClassModalWindow
]).directive(name, function() {
    return {
        //templateUrl,
        controller: SelectClassModalDirective
    }
});