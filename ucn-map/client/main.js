import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiBootstrap from 'angular-ui-bootstrap'
import {name as logException} from './imports/factories/logException';
import {name as TopNavigation} from './imports/components/topNavigation/topNavigation';
import {name as MapContainer} from './imports/components/mapContainer/mapContainer';

angular.module('ucn-map-app', [
    angularMeteor,
    logException,
    uiBootstrap,
    TopNavigation,
    MapContainer
]);