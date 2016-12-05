import roomJson from './rooms.json';
import {Rooms} from '../../../imports/collections/rooms';

export let insertTestData;
insertTestData = function () {
    //console.log("Rooms", Rooms.find());
    //console.log("JSON Rooms", roomJson);
    const logName = "insertScript.js - ";
    let roomsCount = Rooms.find().count();
    if (roomsCount !== roomJson.length) {
        let removed = Rooms.remove({});
        if (removed !== 0) console.log(logName + "removed " + removed + " rooms from mongo");
        let count = 0;
        roomJson.forEach((room) => {
            Rooms.insert(room);
            count+=1;
        });
        console.log(logName + "inserted " + count + " rooms in mongo");
    } else {
        console.log(logName + "rooms count in db is " + roomsCount);
    }
}