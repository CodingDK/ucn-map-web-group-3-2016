import {Meteor} from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import {Classes} from '../../../imports/collections/classes';
import {Rooms} from '../../../imports/collections/rooms';
//import async from 'async';
import parallel from 'async/parallel';

const fs = require('fs');
const path = require('path');

export class WebUntisCtrl {

    static log(message) {
        console.log("webUntis.js - " + message)
    }

    checkWebUntisInformation() {
        this.checkClassList();
        this.checkRoomList();
        this.checkSession();
    }

    checkClassList() {
        //WebUntisCtrl.log("### checkClassList ###");
        let classesCount = Classes.find().count();
        if (classesCount === 0) {
            this.updateClassList();
        } else {
            WebUntisCtrl.log("Classes are already in mongoDB");
        }
    }

    updateClassList() {
        WebUntisCtrl.fetchPageConfig(
            1,
            function doneGettingClassList(error, result) {
                //WebUntisCtrl.log("error: ", error);
                try {
                    let classList = result.data.elements.map(function cleanElement(element) {
                        return {
                            _id: element.name,
                            type: element.type,
                            //name: element.name,
                            longName: element.longName
                        };
                    });
                    //WebUntisCtrl.log("classList: ", classList);
                    let removed = Classes.remove({});
                    if (removed !== 0) WebUntisCtrl.log("removed: " + removed + " classes from mongoDb");
                    let count = 0;
                    classList.forEach((room) => {
                        Classes.insert(room);
                        count+=1;
                    });
                    WebUntisCtrl.log("inserted " + count + " classes in mongo");

                } catch (ex) {
                    WebUntisCtrl.log("error in updateClassList: " + ex);
                    WebUntisCtrl.log("error object from request: " + error);
                }
            }
        )
    }

    checkRoomList() {
        let roomsCur = Rooms.find({webUntisId: null});
        if (roomsCur.count() !== 0) {
            this.updateRooms(roomsCur);
        } else {
            WebUntisCtrl.log("All Rooms already have webUntis room Id in mongoDB");
        }
    }

    /**
     * Update rooms with webUntis room Id
     * @param roomsCur Cursor for rooms collection in mongoDB
     */
    updateRooms(roomsCur) {
        //WebUntisCtrl.log("### updateRooms started ###");
        WebUntisCtrl.fetchPageConfig(4, function doneGettingRoomList(error, result) {
            try {
                let webRoomList = result.data.elements;
                let count = 0;
                roomsCur.forEach(function (room) {
                    //WebUntisCtrl.log("roomName: " + room._id);
                    let webUntisRoom = webRoomList.find(function findRoom(e) {
                       return e.name === room._id;
                    });
                    if (typeof webUntisRoom !== "undefined") {
                        Rooms.update({
                                _id: room._id
                            }, {
                                $set: {
                                    "longName": webUntisRoom.longName,
                                    "webUntisId": webUntisRoom.id
                                }
                            },
                            function(err) {
                                if (err) WebUntisCtrl.log("updateRooms - update with webUntis id " + err);
                            }
                        );
                        count += 1;
                    } else {
                        WebUntisCtrl.log("Couldn't find room in webUntis: " + room.name);
                    }
                    //WebUntisCtrl.log("webUntisRoom", webUntisRoom);
                });
                WebUntisCtrl.log("Updated " + count + " rooms in mongo with webUntis information")
            } catch (ex) {
                WebUntisCtrl.log("error in updateRooms: " + ex);
                WebUntisCtrl.log("error object from request: " + error);
            }
        });

    }

    /**
     * Function for fetching list of elements from webUntis
     * @param type element type, 1 for classList, 4 for roomList
     */
    static fetchPageConfig(type, onDone) {
        let url = "http://ucn.brosa.dk/getPageConfig.php";//"https://webuntis.dk/WebUntis/Timetable.do?request.preventCache=";
        //WebUntisCtrl.log("### run fetchPageConfig ###");
        let options = {
            params: {
                type: type,
                ajaxCommand: "getPageConfig",
            },
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:50.0) Gecko/20100101 Firefox/50.0'
            }
        };
        if (type === 4) { //Rooms
            url += "?buildingId=3"; //Only get data from Sofiendalsvej
        }
        HTTP.post(url, options, onDone);
        //WebUntisCtrl.log("### finish fetchPageConfig ###");
    }

    checkSession() {
        const basePath = path.resolve('.').split('.meteor')[0];
        console.log("basePath", basePath);
        const sessionPath = basePath + "/server/imports/data/sessions.json";
        if (!fs.existsSync(sessionPath)) {
            console.log("TEST" , false);
            this.createSessionFile(sessionPath);
        } else {

            console.log("TEST" , true);
        }
    }

    createSessionFile(sessionPath) {
        const url = "http://ucn.brosa.dk/get_lessons_min.php";//?;

        let elementId = 646;
        let date = "2016-12-05";

        let query = "type=4&element=" + elementId + "&date=" + date;
        console.log("query", query);
        let options = {
            query: query,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:50.0) Gecko/20100101 Firefox/50.0'
            }
        };

        let testData = [];

        // HTTP.get(url, options, function doneGettingSession(error, result) {
        //    console.log("error", error);
        //    console.log("result", result);
        //     testData.concat(result);
        // });
        //
        // HTTP.get(url, options, function doneGettingSession(error, result) {
        //     console.log("error", error);
        //     console.log("result", result);
        //     testData.concat(result);
        // });

        // parallel([
        //     test,
        //     test
        // ], function(err, results) {
        //     // optional callback
        //     console.log("results", results);
        // });
        //
        // function test(callback) {
        //     console.log("## hej ##");
        //     callback(null, "callback! ");
        // }

        // HTTP.get(url, options, function doneGettingSession(error, result) {
        //    console.log("error", error);
        //    console.log("result", result);
        // });

    }
}