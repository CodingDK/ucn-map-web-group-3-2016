import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Classes} from '../../../../imports/collections/classes';

class SelectClassModalCtrl{
    constructor($scope, mapService) {
        'ngInject';
        $scope.selectedClass = undefined;
        $scope.txtDate = new Date();

        $scope.subscribe('classes');
        $scope.getClasses = function() {
            return Classes.find().fetch();
        }
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
    }
}

const name = 'selectModalCtrl';

export default angular.module(name, [
    angularMeteor
]).controller(name, SelectClassModalCtrl);