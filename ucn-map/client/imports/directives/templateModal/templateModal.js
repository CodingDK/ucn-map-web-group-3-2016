import angular from 'angular';
import angularMeteor from 'angular-meteor';
import templateUrl from './templateModal.html';

"use strict";
class TemplateModalCtrl {
    constructor($uibModal, $state) {
        'ngInject';

        $uibModal.open({
            templateUrl,
            controller: function($scope) {
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
            setTimeout(function () {
                $state.go('selectClassModal');
            },100);
        }
        function doDismissFn() {
            return doClosureFn();
        }

    }
}

const name = 'templateModal';

// create a module
export default angular.module(name, [
    angularMeteor
]).directive(name, function () {
    return {
        //templateUrl,
        //controllerAs: name,
        controller: TemplateModalCtrl
    }
});