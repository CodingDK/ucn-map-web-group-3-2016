import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Classes} from '../../../../imports/collections/classes';

class SelectClassModalCtrl{
    constructor($scope, $reactive, mapService) {
        'ngInject';
        $reactive(this).attach($scope);
        this.selectedClass = undefined;
        this.txtDate = new Date();

        this.subscribe('classes');
        this.helpers({
            getClasses: () => {
                return Classes.find();//.fetch();
            }
        })
        this.dateOptions = {
            //dateDisabled: disabled,
            formatYear: 'yy',
            //maxDate: new Date(2020, 5, 22),
            //minDate: new Date(),
            startingDay: 1
        };
        this.openDatePopup = function() {
            this.datePopup.opened = true;
        };
        this.datePopup = {
            opened: false
        };
        this.find = function () {
            mapService.setRoomInCenter("4.0.30");
            this.dismiss();
            //mapService.setLocation(57.0208519, 9.8845859);
        }
        this.dismiss = function() {
            $scope.$dismiss();
        };
    }
}

const name = 'selectClassModalCtrl';

export default angular.module(name, [
    angularMeteor
]).controller(name, SelectClassModalCtrl);