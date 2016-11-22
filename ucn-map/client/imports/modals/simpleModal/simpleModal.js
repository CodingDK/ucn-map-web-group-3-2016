import templateUrl from "./simpleModal.html";

export class SimpleModal {
    onEnter = function($stateParams, $state, $uibModal) {
        'ngInject';
        $uibModal.open({
            templateUrl,
            controller: ['$scope', function($scope) {
                $scope.dismiss = function() {
                    $scope.$dismiss();
                };
            }],
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
