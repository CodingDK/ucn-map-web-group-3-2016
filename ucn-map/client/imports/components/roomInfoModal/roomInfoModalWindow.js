import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Rooms} from '../../../../imports/collections/rooms';
import {Sessions} from '../../../../imports/collections/sessions';
import moment from 'moment';
import templateUrl from './roomInfoModalWindow.html';

class RoomInfoModalWindow {
    alertService;

    constructor($scope, $reactive, $stateParams, calendarConfig, alertService, settingsService) {
        'ngInject';
        $reactive(this).attach($scope);
        this.alertService = alertService;
        console.log("$stateParams", $stateParams);

        this.subscribe('rooms');
        this.subscribe('sessions');
        this.loaded = false;
        this.roomName = $stateParams.roomId;

        this.helpers({
            room: () => {
                let room = Rooms.findOne({_id: this.roomName});
                if (typeof room !== "undefined") {
                    this.loaded = true;
                }
                //console.log("room helper", room);
                return room;
            },
            events: () => {
                return Sessions.find({location:this.roomName}).map(function (obj) {
                    let title = obj.title;
                    if (obj.elements.length) {
                        title += " (" + obj.elements.join(" ") + ")";
                    }
                    return {
                        session: obj,
                        title: title,
                        color: calendarConfig.colorTypes.info,
                        startsAt: moment(obj.start).toDate(),
                        endsAt: moment(obj.end).toDate()
                    }
                });
            }
        });

        this.calendarView = 'day';
        this.viewDate = settingsService.mapTime;

        const originalFormat = calendarConfig.dateFormats.hour;
        calendarConfig.dateFormats.hour = 'HH:mm';

        $scope.$on('$destroy', function() {
            calendarConfig.dateFormats.hour = originalFormat; // reset for other demos
        });
    }

    eventClicked(event) {
        console.log("clicked", event);
        let session = event.session;
        date = moment(session.start).calendar(null, {
            sameDay: '[Today]',
            nextDay: '[Tomorrow]',
            nextWeek: 'dddd',
            lastDay: '[Yesterday]',
            lastWeek: '[Last] dddd',
            sameElse: 'DD/MM/YYYY'
        });
        this.alertService.show(
            session.title,`
                    <div class="eventDetails">
                        <div class="row">
                            <div class="col col-md-6">
                                Start:
                            </div>
                            <div class="col col-md-6">
                                ` + date + `
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-md-6">
                                Start:
                            </div>
                            <div class="col col-md-6">
                                ` + moment(session.start).format('HH:mm') + `
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-md-6">
                                End:
                            </div>
                            <div class="col col-md-6">
                                ` + moment(session.end).format('HH:mm') + `
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-md-6">
                                Description:
                            </div>
                            <div class="col col-md-6">
                                ` + session.elements.join(" ") + `
                            </div>
                        </div>
                    </div>`
        );
    };

}

const name = 'roomInfoModalWindow';

export default angular.module(name, [
    angularMeteor
]).component(name, {
        templateUrl,
        bindings: {
            //resolve: '<',
            //close: '&',
            dismiss: '&'
        },
        controllerAs: "ctrl",
        controller: RoomInfoModalWindow
  });