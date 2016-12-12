import {Meteor} from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import {Classes} from '../../../imports/collections/classes';
import {Rooms} from '../../../imports/collections/rooms';
import {Sessions} from '../../../imports/collections/sessions';
import moment from 'moment';

const fs = require('fs');
const path = require('path');

export class WebUntisCtrl {

    constructor() {
        const basePath = path.resolve('.').split('.meteor')[0];
        this.sessionFilePath = basePath + "server/imports/data/sessions.json";
    }

    static log(message) {
        console.log("webUntis.js - " + message)
    }

    checkWebUntisInformation() {
        this.checkClassList();
        this.checkRoomList();
        this.checkSessions();
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
        let roomsCur = Rooms.find({webUntisId: null, type: 1});
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
                        WebUntisCtrl.log("Couldn't find room in webUntis: " + room._id);
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

    checkSessions() {
        if (!fs.existsSync(this.sessionFilePath)) {
            this.createSessionFile();
        } else {
            WebUntisCtrl.log("Session File already exist");
            WebUntisCtrl.updateSessionsInMongo(this.sessionFilePath);
        }

    }

    static updateSessionsInMongo(path) {
        fs.readFile(path, Meteor.bindEnvironment(function read(err, data) {
            if (err) {
                WebUntisCtrl.log("Session File couldn't be readed, error: " + err);
            }

            let sessionJson = JSON.parse(data);
            const jsonlength = sessionJson.length;
            if (jsonlength === 0) {
                WebUntisCtrl.log("No Sessions in file");
                return;
            }
            let firstObjInJson = sessionJson[0];
            let firstObjInMongo = Sessions.findOne({title: firstObjInJson.title,
                start: {$eq: moment(firstObjInJson.start).toDate()},
                end: {$eq: moment(firstObjInJson.end).toDate()}
            });
            let sessionsCount = Sessions.find().count();
            if (typeof firstObjInMongo !== "undefined" && jsonlength === sessionsCount) {
                WebUntisCtrl.log("Sessions in mongo are already in mongo, count: " + sessionsCount);
            } else {
                let removed = Sessions.remove({});
                if (removed !== 0) WebUntisCtrl.log("removed " + removed + " sessions from mongo");
                let count = 0;
                sessionJson.forEach((session) => {
                    let elements = [];
                    try {
                        elements = session.description.split(" ");
                    } catch (ex) {
                        WebUntisCtrl.log("sessions description is not a string: " + session.description)
                    }
                    let cleanedObj = {
                        title: session.title,
                        start: moment(session.start).toDate(),// Date.parse(session.start),
                        end: moment(session.end).toDate(),// Date.parse(session.end),
                        location: session.location,
                        elements: elements
                    };
                    Sessions.insert(cleanedObj);
                    count += 1;
                });
                WebUntisCtrl.log("inserted " + count + " sessions in mongo");
            }
            //}
        }));
    }

    createSessionFile() {
        //WebUntisCtrl.log("### started creating sessions ###");
        let date = moment().startOf('isoweek').format("YYYY-MM-DD"); //get monday of this week


        let roomsCur = Rooms.find({webUntisId: {$ne:null}, type: 1}).fetch();
        const path = this.sessionFilePath;
        let doneCount = roomsCur.length;
        let sessions = [];
        roomsCur.forEach(function(room) {
            //WebUntisCtrl.log( "room: " + room._id + "= id:"+room.webUntisId );
            WebUntisCtrl.fetchSessions(room, date, function doneGettingSession(error, result) {
                //WebUntisCtrl.log("error", error);
                //WebUntisCtrl.log("result", result.data);
                if (error) {
                    WebUntisCtrl.log("Error getting sessions for room " + room._id + ": " + error);
                } else {
                    sessions = sessions.concat(result.data);
                }
                doneCount -= 1;
                handleIfGettingIsDone();

            });
        });
        function handleIfGettingIsDone() {
            if (doneCount === 0) {
                fs.writeFile(path, JSON.stringify(sessions), function(err) {
                    if(err) {
                        return WebUntisCtrl.log("Error saving session file: " + err);
                    }
                    WebUntisCtrl.log("Sessions file was saved with " + sessions.length + " sessions");
                });
                WebUntisCtrl.updateSessionsInMongo(path);
            }
        }
        //WebUntisCtrl.log("### ended creating sessions ###");
    }

    /**
     * Get data for sessions from webUntis
     * @param room the room object
     * @param date monday of the week for getting info for. format: YYYY/MM/DD
     * @param onDone
     */
    static fetchSessions(room, date, onDone) {
        let elementId = room.webUntisId;
        const url = "http://ucn.brosa.dk/get_lessons_min.php";//?;
        let options = {
            query: "type=4&element=" + elementId + "&date=" + date,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:50.0) Gecko/20100101 Firefox/50.0'
            }
        };

        HTTP.get(url, options, onDone);
    }
}