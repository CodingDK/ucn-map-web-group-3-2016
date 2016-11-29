import angular from 'angular';
import angularMeteor from 'angular-meteor';

class MapService {
    mapInstance;

    setLocation(latitude, longitude) {
        this.checkMapInstance();
        this.mapInstance.setLocation(latitude, longitude);
    }

    setRoomInCenter(roomId) {
        this.checkMapInstance();
        this.mapInstance.setRoomInCenter(roomId);
    }

    checkMapInstance() {
        if (typeof this.mapInstance === "undefined") {
            throw new Error("mapinstance is undefined");
        }
    }
}

const name = 'mapService';

export default angular.module(name, [
    angularMeteor
]).service(name, MapService);