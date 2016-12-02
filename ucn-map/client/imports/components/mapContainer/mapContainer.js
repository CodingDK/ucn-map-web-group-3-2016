import angular from 'angular';
import angularMeteor from 'angular-meteor';
import 'angular-simple-logger';
import 'angular-google-maps';
import templateUrl from './mapContainer.html';
import {Rooms} from '../../../../imports/collections/rooms';

class MapCtrl {
    constructor($scope, $reactive, mapService) {
        'ngInject';
        $reactive(this).attach($scope);

        mapService.mapInstance = this;

        this.map = {
            center: {
                latitude: 57.0208519,
                longitude: 9.8845859
            },
            zoom: 18,
            events: {
                click: (mapModel, eventName, originalEventArgs) => {
                    this.setLocation(originalEventArgs[0].latLng.lat(), originalEventArgs[0].latLng.lng());
                    $scope.$apply();
                }
            },
            control: {},
            options: {
                mapTypeControl: false,
                streetViewControl: false
            }
        };
        this.subscribe('rooms');

        this.helpers({
            poly() {
                return MapCtrl.getRoomsAsPolygons(Rooms.find().fetch());
            }
        });

        //this.poly = MapCtrl.getRoomsAsPolygons();

        this.setRoomInCenter = function(roomId) {
            var founded = this.poly.filter(function( obj ) {
                return obj.id === roomId;
            })[0];
            if (typeof founded === "undefined") {
                //TODO handle if a room not founded?
                console.log("room not founded! ", roomId);
                return;
            }
            var bounds = new google.maps.LatLngBounds();

            var path = founded.path;
            for (var i = 0, length = path.length; i < length; i++) {
                var cor = path[i];
                bounds.extend(new google.maps.LatLng(cor.latitude, cor.longitude));
            }
            var mapInstance = this.map.control.getGMap();
            mapInstance.fitBounds(bounds);
            mapInstance.setZoom(19);
        }

        //TODO maybe need to test this in same way?
        $scope.$on('$destroy', function destroyMapContainer() {
            console.log("destroyed map!");
            mapService.mapInstance = undefined;
        })
    }

    setLocation(latitude, longitude) {
        this.location = {
            latitude,
            longitude
        };
    }

    static getRoomsAsPolygons(roomSource) {
        let newArr = [];
        for (let room of roomSource) {
            newArr.push({
                id: room.name,
                path: room.path,
                stroke: {
                    color: '#6060FB',
                    weight: 1
                },
                visible: true,
                fill: {
                    color: '#ff0000',
                    opacity: 0.5
                }
            });
        }
        return newArr;
    }
}

const name = 'mapContainer';

// create a module
export default angular.module(name, [
    angularMeteor,
    'nemLogging', // https://github.com/angular-ui/angular-google-maps/issues/1633
    'uiGmapgoogle-maps'
]).component(name, {
    templateUrl,
    controller: MapCtrl
}).config(function(uiGmapGoogleMapApiProvider) {
    'ngInject';
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyAUpSnIVNolxk8A9-mv4O9nsFZQ7t_NzYw'
    });
});