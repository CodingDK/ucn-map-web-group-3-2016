import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiBootstrap from 'angular-ui-bootstrap';
import uiRouter from 'angular-ui-router';
import {name as logException} from './imports/factories/logException';
import {name as TopNavigation} from './imports/components/topNavigation/topNavigation';
import {name as MapContainer} from './imports/components/mapContainer/mapContainer';
import {name as TemplateModal} from './imports/directives/templateModal/templateModal';
import {name as SelectClassModal} from './imports/directives/selectClassModal/selectClassModal';
import {name as MapService} from './imports/services/mapService/mapService';


angular.module('ucn-map-app', [
    angularMeteor,
    logException,
    uiBootstrap,
    uiRouter,
    TopNavigation,
    MapContainer,
    TemplateModal,
    SelectClassModal,
    MapService
])
.config(function routeConfig($stateProvider, $urlRouterProvider, $locationProvider)  {
    'ngInject';
    $urlRouterProvider.otherwise("home");

    $locationProvider.html5Mode(true);
    $stateProvider.state("home", {
        template: '',
        url: '/home'
    });
    $stateProvider.state("selectClassModal", {
        template: '<select-class-modal></select-class-modal>',
        url: "/selectClass"
    });
    $stateProvider.state("templateModal", {
        template: '<template-modal></template-modal>',
        url: '/templateModal'
    });
});