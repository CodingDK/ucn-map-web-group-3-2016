import roomJson from './rooms.json';
import {Rooms} from '../../../imports/collections/rooms';

export var insertTestData;
insertTestData = function () {
    //console.log("Rooms", Rooms.find());
    //console.log("JSON Rooms", roomJson);
    var roomsCount = Rooms.find().count();
    if (roomsCount !== 4) {
        var removed = Rooms.remove({});
        console.log("removed: " + removed + " from room");
        const roomsLocal = roomJson;
        var count = 0;
        roomsLocal.forEach((room) => {
            Rooms.insert(room);
            count+=1;
        });
        console.log("inserted " + count + " rooms in mongo");
    } else {
        console.log("rooms count in db is " + roomsCount);
    }
}