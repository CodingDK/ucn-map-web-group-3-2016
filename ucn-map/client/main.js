import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiBootstrap from 'angular-ui-bootstrap';
import uiRouter from 'angular-ui-router';
import {name as logException} from './imports/factories/logException';
import {name as TopNavigation} from './imports/components/topNavigation/topNavigation';
import {name as MapContainer} from './imports/components/mapContainer/mapContainer';
import {SimpleModal} from './imports/modals/simpleModal/simpleModal';
import {SelectClassModal} from './imports/modals/selectClassModal/selectClassModal';

angular.module('ucn-map-app', [
    angularMeteor,
    logException,
    uiBootstrap,
    uiRouter,
    TopNavigation,
    MapContainer
])
.config(function routeConfig($stateProvider, $urlRouterProvider, $locationProvider)  {
    'ngInject';
    $urlRouterProvider.otherwise("home");

    $locationProvider.html5Mode(true);
    $stateProvider.state("home", {
        template: '',
        url: '/home'
    });
    $stateProvider.state("modal", {
        url: "/modal",
        onEnter: new SimpleModal().onEnter
    });
    $stateProvider.state("selectClassModal", {
        url: "/selectClass",
        onEnter: new SelectClassModal().onEnter
    });
});