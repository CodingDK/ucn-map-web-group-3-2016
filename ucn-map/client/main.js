import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiBootstrap from 'angular-ui-bootstrap';
import uiRouter from 'angular-ui-router';
import ngMessage from 'angular-messages';
//import 'angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls';
import uiCalendar from 'angular-bootstrap-calendar';
import uiNotification from 'angular-ui-notification';
import {name as logException} from './imports/factories/logException';
import {name as alertService} from './imports/services/alertService/alertService';
import {name as MapService} from './imports/services/mapService/mapService';
import {name as SettingsService} from './imports/services/settingsService/settingsService';
import {name as MapNavigation} from './imports/components/mapNavigation/mapNavigation';
import {name as MapContainer} from './imports/components/mapContainer/mapContainer';
import {name as SelectClassModal} from './imports/components/selectClassModal/selectClassModal';
import {name as RoomInfoModal} from './imports/components/roomInfoModal/roomInfoModal';


const name = 'ucn-map-app';

export default angular.module(name, [
    angularMeteor,
    logException,
    alertService,
    uiBootstrap,
    uiRouter,
    ngMessage,
    uiCalendar,
    uiNotification,
    MapNavigation,
    MapContainer,
    SelectClassModal,
    MapService,
    SettingsService,
    RoomInfoModal
])
.config(function routeConfig($stateProvider, $urlRouterProvider, $locationProvider, $angularTemplatesSettings)  {
    'ngInject';

    $locationProvider.html5Mode(true);
    $stateProvider.state("home", {
        template: '',
        url: '/home'
    });
    $stateProvider.state("selectClassModal", {
        template: '<select-class-modal></select-class-modal>',
        url: "/selectClass"
    });
    $stateProvider.state("roomInfoModal", {
        template: '<room-info-modal></room-info-modal>',
        url: '/room/:roomId'
    });
    $urlRouterProvider.otherwise("home");

    $angularTemplatesSettings.warning = false;
    $angularTemplatesSettings.error = false;

});