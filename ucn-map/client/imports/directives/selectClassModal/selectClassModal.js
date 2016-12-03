import angular from 'angular';
import angularMeteor from 'angular-meteor';
import templateUrl from "./selectClassModal.html";
import {name as SelectClassModalCtrl} from './selectClassModalCtrl';

class SelectClassModalDirective {
    constructor($uibModal, $state) {
        'ngInject';

        $uibModal.open({
            templateUrl,
            controller: SelectClassModalCtrl,
            size: "sm",
            /*resolve: {
             items: function () {
             return [1,2,3];
             }
             }*/
        }).result.then(doClosureFn, doDismissFn);

        function doClosureFn() {
            $state.go('home');
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
        //controllerAs: name,
        controller: SelectClassModalDirective
    }
});