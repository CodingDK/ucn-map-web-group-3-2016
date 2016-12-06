import angular from 'angular';
import angularMeteor from 'angular-meteor';
import templateUrl from './roomInfoModal.html';

"use strict";
class RoomInfoModal {
    constructor($uibModal, $state, $timeout) {
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