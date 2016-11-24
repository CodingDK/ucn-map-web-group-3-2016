import templateUrl from "./selectClassModal.html";

export class SelectClassModal {
    onEnter = function($stateParams, $state, $uibModal) {
        'ngInject';
        $uibModal.open({
            templateUrl,
            controller: ['$scope', function($scope) {
                $scope.selectedClass = undefined;
                $scope.txtDate = new Date();
                $scope.classArray = ['pwe0916', 'pwe0216', 'pwe1216'];
                $scope.dateOptions = {
                    //dateDisabled: disabled,
                    formatYear: 'yy',
                    //maxDate: new Date(2020, 5, 22),
                    //minDate: new Date(),
                    startingDay: 1
                };
                $scope.openDatePopup = function() {
                    $scope.datePopup.opened = true;
                };
                $scope.datePopup = {
                    opened: false
                };
                $scope.dismiss = function() {
                    $scope.$dismiss();
                };
            }],
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