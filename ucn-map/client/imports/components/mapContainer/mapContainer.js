import angular from 'angular';
import angularMeteor from 'angular-meteor';
import 'angular-simple-logger';
import 'angular-google-maps';
import templateUrl from './mapContainer.html';
import roomJson from './rooms.json';


class MapCtrl {
    constructor($scope, $reactive, uiGmapGoogleMapApi) {
        'ngInject';
        //$reactive(this).attach($scope);

        $scope.map = {
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

            showOverlay: true,
        };

        $scope.poly = MapCtrl.getRoomsAsPolygons();

        uiGmapGoogleMapApi.then(function(maps) {
            // (google is defined)

            $scope.imageMapType = {
                getTileUrl: function(coord, zoom) {
                    var normalizedCoord = $scope.getNormalizedCoord(coord, zoom);
                    if (!normalizedCoord) {
                        return null;
                    }
                    var bound = Math.pow(2, zoom);
                    return '//mw1.google.com/mw-planetary/lunar/lunarmaps_v1/clem_bw' +
                        '/' + zoom + '/' + normalizedCoord.x + '/' +
                        (bound - normalizedCoord.y - 1) + '.jpg';
                },
                tileSize: new google.maps.Size(256, 256),
                maxZoom: 9,
                minZoom: 0,
                radius: 1738000};
        });


        this.setLocation = function(latitude, longitude) {
            $scope.location = {
                latitude,
                longitude
            };
        };

        // Normalizes the coords that tiles repeat across the x axis (horizontally)
        // like the standard Google map tiles.
        $scope.getNormalizedCoord = function(coord, zoom) {
            var y = coord.y;
            var x = coord.x;

            // tile range in one direction range is dependent on zoom level
            // 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
            var tileRange = 1 << zoom;

            // don't repeat across y-axis (vertically)
            if (y < 0 || y >= tileRange) {
                return null;
            }

            // repeat across x-axis
            if (x < 0 || x >= tileRange) {
                x = (x % tileRange + tileRange) % tileRange;
            }

            return {x: x, y: y};
        };
    }

    static getRoomsAsPolygons = function() {
        let newArr = [];
        for (let room of roomJson) {
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
    controllerAs: "ctrl",
    // bindings: {
    //     location: '='
    // },
    controller: MapCtrl
});