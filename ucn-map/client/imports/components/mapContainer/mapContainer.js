import angular from 'angular';
import angularMeteor from 'angular-meteor';
import 'angular-simple-logger';
import 'angular-google-maps';
import templateUrl from './mapContainer.html';


class MapCtrl {
    constructor($scope, $reactive) {
        'ngInject';
        //$reactive(this).attach($scope);

        $scope.map = {
            center: {
                latitude: 57.0269181,
                longitude: 9.7673928
            },
            zoom: 11,
            events: {
                click: (mapModel, eventName, originalEventArgs) => {
                    this.setLocation(originalEventArgs[0].latLng.lat(), originalEventArgs[0].latLng.lng());
                    $scope.$apply();
                }
            }
        };

        $scope.poly = [
            {
                id: 1,
                path: [
                    {
                        latitude: 50,
                        longitude: -80
                    },
                    {
                        latitude: 30,
                        longitude: -120
                    },
                    {
                        latitude: 20,
                        longitude: -95
                    }
                ],
                stroke: {
                    color: '#6060FB',
                    weight: 3
                },
                editable: true,
                draggable: true,
                geodesic: false,
                visible: true,
                fill: {
                    color: '#ff0000',
                    opacity: 0.8
                }
            }
        ];

        $scope.marker = {
            options: {
                draggable: true
            },
            events: {}
        };

        this.setLocation = function(latitude, longitude) {
            $scope.location = {
                latitude,
                longitude
            };
        }
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