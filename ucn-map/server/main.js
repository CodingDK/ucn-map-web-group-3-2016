import { Meteor } from 'meteor/meteor';
//import { } from "../imports/logger";

import roomJson from './rooms.json';
import {Rooms} from '../collections/rooms';

Meteor.startup(() => {
  // code to run on server at startup
    Kadira.connect('7NJFMudktKcn2TFRS', '11f6c042-0f83-4c4e-a9a5-4e06ba9c0dd2');
    //logger.info("test?");
    //console.log("Rooms", Rooms.find());
    //console.log("JSON Rooms", roomJson);
    if (Rooms.find().count() === 0) {
        console.log("inserted rooms in mongo");
        const roomsLocal = roomJson;
        roomsLocal.forEach((room) => {
            Rooms.insert(room)
        });
    }
});
