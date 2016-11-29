import angular from 'angular';
import angularMeteor from 'angular-meteor';
import templateUrl from "./selectClassModal.html";

class SelectClassModalCtrl {
    constructor($uibModal, $state) {
        'ngInject';

        $uibModal.open({
            templateUrl,
            controller: function($scope, mapService) {
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
                $scope.find = function () {
                    mapService.setRoomInCenter("4.0.30");
                    $scope.dismiss();
                    //mapService.setLocation(57.0208519, 9.8845859);
                }
                $scope.dismiss = function() {
                    $scope.$dismiss();
                };
            },
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
    angularMeteor
]).directive(name, function SelectClassModalDirective() {
    return {
        //templateUrl,
        //controllerAs: name,
        controller: SelectClassModalCtrl
    }
});