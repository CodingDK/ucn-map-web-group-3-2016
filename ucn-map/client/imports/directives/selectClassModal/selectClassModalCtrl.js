import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Classes} from '../../../../imports/collections/classes';
import {Sessions} from '../../../../imports/collections/sessions';
import moment from 'moment';

class SelectClassModalCtrl{
    constructor($scope, $reactive, mapService) {
        'ngInject';
        $reactive(this).attach($scope);
        this.mapService = mapService;

        this.selectedClass = null;
        this.txtDate = new Date();

        this.subscribe('classes');
        this.subscribe('sessions');
        this.helpers({
            getClasses: () => {
                return Classes.find();//.fetch();
            },
            /*getSessionForDate: () => {
                if (!this.isClassNameValid()) return null;
                //return null;

                let className = this.selectedClass._id;

                let date = moment(this.txtDate).startOf('date');
                console.log("getSesssion", date);
                let session = Sessions.findOne({
                    start: {
                        $gte: date.toDate(),
                        $lt: date.add(1, 'days').toDate()
                    },
                    elements: className
                });
                return session;
            },*/
        })
        this.dismiss = () => {
            $scope.$dismiss();
        }
    }

    datePopup = {
        opened: false
    }

    dateOptions = {
        //dateDisabled: disabled,
        //formatYear: 'yy',
        //maxDate: new Date(2020, 5, 22),
        //minDate: new Date(),
        startingDay: 1
    }

    openDatePopup() {
        this.datePopup.opened = true;
    }

    showOnMap() {
        if (!this.isClassNameValid()) {
            //TODO ClassName is not found
            return;
        }
        if (!this.isDateValid()) {
            //TODO Date is not valid
        }
        let date = moment(this.txtDate).startOf('date');
        let firstSession = Sessions.findOne({
            start: {
                $gte: date.toDate(),
                $lt: date.add(1, 'days').toDate()
            },
            elements: this.selectedClass._id,
            location: {$ne:null}
        });
        if (typeof firstSession !== "undefined") {
            let location = firstSession.location;
            this.mapService.setRoomInCenter(location);
            this.dismiss();
        } else {
            //TODO No Session found for the search terms
        }
    }

    isClassNameValid() {
        if (typeof this.selectedClass === "string") {
            let findFirst = this.getClasses.find((element) => {
                return element._id === this.selectedClass;
            });

            if (typeof findFirst !== "undefined") {
                this.selectedClass = findFirst;
                return true;
            } else {
                return false;
            }
        }
        return this.selectedClass !== null;
    }

    isDateValid() {
        return moment(this.txtDate, "YYYY-MM-DD").isValid();
    }
}

const name = 'selectClassModalCtrl';

export default angular.module(name, [
    angularMeteor
]).controller(name, SelectClassModalCtrl);