import angular from 'angular';
import angularMeteor from 'angular-meteor';
import 'angular-simple-logger';
import 'angular-google-maps';
import templateUrl from './mapContainer.html';
import {Rooms} from '../../../../imports/collections/rooms';
import {Sessions} from '../../../../imports/collections/sessions';

class MapCtrl {
    constructor($scope, $reactive, mapService, $state, settingsService) {
        'ngInject';
        $reactive(this).attach($scope);

        mapService.mapInstance = this;
        this.$state = $state;
        this.settings = settingsService;

        this.firstRun = true;

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
        this.marker = {
            id: 0,
            coords: {
                latitude: 57.0208519,
                longitude: 9.8845859
            },
            events: {
                click: (mapModel, eventName, originalEventArgs) => {
                    this.setMarkerVisible(false);
                    $scope.$apply();
                }
            },
            options: {
                visible: false//() => {return this.marker.show;}
            }
        }

        this.polyRooms = [];

        this.subscribe('rooms');
        this.subscribe('sessions');

        this.helpers({
            updatePolygons() {
                this.makeRoomsAsPolygons();
                if (this.firstRun) this.firstRun = false;
            }
        });

        $scope.$on('setting:showFreeRooms', (event,data) => {
            this.makeRoomsAsPolygons();
        });

        $scope.$on('setting:mapTime', (event,data) => {
            this.makeRoomsAsPolygons();
        });


        //TODO maybe need to test this in same way?
        $scope.$on('$destroy', function destroyMapContainer() {
            console.log("destroyed map!");
            mapService.mapInstance = undefined;
        })
    }

    setRoomInCenter(roomId) {
        var founded = this.polyRooms.filter(function( obj ) {
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
        this.marker.coords = {
            latitude: bounds.getCenter().lat(),
            longitude: bounds.getCenter().lng()
        }
        this.setMarkerVisible(true);
        var mapInstance = this.map.control.getGMap();
        mapInstance.fitBounds(bounds);
        mapInstance.setZoom(19);
    }

    setMarkerVisible(val) {
        this.marker.options.visible = val;
    }

    setLocation(latitude, longitude) {
        this.location = {
            latitude,
            longitude
        };
    }

    makeRoomsAsPolygons() {
        let sessions = this.getSessionsVisibleOnMap();

        this.polyRooms = Rooms.find().map((room) => {
            return {
                id: room._id,
                path: room.path,
                stroke: {
                    color: '#6060FB',
                    weight: 1
                },
                visible: true,
                fill: this.getFillForRoom(room, sessions),
                events:{
                    click: (mapModel, eventName, originalEventArgs) => {
                        this.$state.go("roomInfoModal", {roomId: room._id});
                    }
                }
            };
        });
    }

    getSessionsVisibleOnMap() {
        let date = this.settings.mapTime;
        return Sessions.find({
            start: {$lte: date},
            end: {$gte: date},
            location: {$ne: null}
        }, { fields: {location: 1}
        }).map((element) => {
            return element.location;
        });
    }

    getFillForRoom(room, sessions) {
        let opacity = 0.0;
        if (this.settings.showFreeRooms && !this.firstRun && !sessions.includes(room._id)) {
            opacity = 0.5;
        }
        return {
            color: '#5aff4d',
            opacity
        };
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

