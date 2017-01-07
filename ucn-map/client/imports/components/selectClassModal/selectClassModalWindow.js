import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Classes} from '../../../../imports/collections/classes';
import {Sessions} from '../../../../imports/collections/sessions';
import moment from 'moment';
import templateUrl from "./selectClassModalWindow.html";

class SelectClassModalWindow {
    constructor($scope, $reactive, mapService, settingsService, Notification) {
        'ngInject';
        $reactive(this).attach($scope);
        this.mapService = mapService;
        this.Notification = Notification;

        this.selectedClass = null;
        this.txtDate = settingsService.mapTime;

        this.classNameValid = true;
        this.txtDateValid = true;

        this.subscribe('classes');
        this.subscribe('sessions');
        this.helpers({
            getClasses: () => {
                return Classes.find();//.fetch();
            }
        })
        //this.dismiss = () => {
        //    this.$dismiss();
        //}
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

    showOnMap(form) {
        form.$setSubmitted();

        if (!this.isClassNameValid()) {
            //ClassName is not found
            return;
        }

        if (!this.isDateValid()) {
            //Date is not valid
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
            this.Notification.info({message: 'No Session found for the search terms', title: 'No result'});
        }
    }

    isClassNameValid() {
        if (typeof this.selectedClass === "string") {
            let findFirst = this.getClasses.find((element) => {
                this.classNameValid = element._id === this.selectedClass;
                return this.classNameValid;
            });

            if (typeof findFirst !== "undefined") {
                this.selectedClass = findFirst;
                this.classNameValid = true;
                return this.classNameValid;
            } else {
                this.classNameValid = false;
                return this.classNameValid;
            }
        }
        this.classNameValid = this.selectedClass !== null;
        return this.classNameValid;
    }

    isDateValid() {
        this.txtDateValid = moment(this.txtDate, "YYYY-MM-DD").isValid();
        return this.txtDateValid;
    }

    validateClassName(form) {
        form.className.$setValidity('isInvalid', this.isClassNameValid());
    }

    clearValidClassNameError(form) {
        if (!this.classNameValid) {
            this.classNameValid = true;
            form.className.$setValidity('isInvalid', this.classNameValid);
        }
    }

    validateDate(form) {
        form.txtDate.$setValidity('isInvalid', this.isDateValid());
    }
}

const name = 'selectClassModalWindow';

export default angular.module(name, [
    angularMeteor
])//.controller(name, SelectClassModalWindow);
    .component(name, {
        templateUrl,
        bindings: {
            //resolve: '<',
            //close: '&',
            dismiss: '&'
        },
        controllerAs: "ctrl",
        controller: SelectClassModalWindow
    })