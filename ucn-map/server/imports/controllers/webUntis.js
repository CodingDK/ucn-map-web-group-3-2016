import {Meteor} from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import {Classes} from '../../../imports/collections/classes';
import {Rooms} from '../../../imports/collections/rooms';

export class WebUntisCtrl {

    log(message) {
        console.log("webUntis.js - " + message)
    }

    checkWebUntisInformation() {
        this.checkClassList();
        this.checkRoomList();
    }

    checkClassList() {
        //this.log("### checkClassList ###");
        let classesCount = Classes.find().count();
        if (classesCount === 0) {
            this.updateClassList();
        } else {
            this.log("Classes are already in mongoDB");
        }
    }

    updateClassList() {
        WebUntisCtrl.fetchPageConfig(
            1,
            function doneGettingClassList(error, result) {
                //this.log("error: ", error);
                try {
                    let classList = result.data.elements.map(WebUntisCtrl.cleanElement);
                    //this.log("classList: ", classList);
                    let removed = Classes.remove({});
                    if (removed !== 0) this.log("removed: " + removed + " classes from mongoDb");
                    Classes.insertMany({classList})
                    this.log("inserted " + classList.length + " classes in mongo");

                } catch (ex) {
                    this.log("error in updateClassList: " + ex);
                    this.log("error object from request: " + error);
                }
            }
        )
    }

    checkRoomList() {
        let roomsCur = Rooms.find({webUntisId: null});
        if (roomsCur.count() !== 0) {
            this.updateRooms(roomsCur);
        } else {
            this.log("All Rooms already have webUntis room Id in mongoDB");
        }
    }

    /**
     * Update rooms with webUntis room Id
     * @param roomsCur Cursor for rooms collection in mongoDB
     */
    updateRooms(roomsCur) {
        //this.log("### updateRooms started ###");
        WebUntisCtrl.fetchPageConfig(4, function doneGettingRoomList(error, result) {
            try {
                let webRoomList = result.data.elements.map(WebUntisCtrl.cleanElement);
                let count = 0;
                roomsCur.forEach(function (room) {
                    //this.log("roomName: " + room.name);
                    let webUntisRoom = webRoomList.find(function findRoom(e) {
                       return e.name === room.name;
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
                                if (err) this.log("updateRooms - update with webUntis id " + err);
                            }
                        );
                        count += 1;
                    } else {
                        this.log("Couldn't find room in webUntis: " + room.name);
                    }
                    //this.log("webUntisRoom", webUntisRoom);
                });
                this.log("Updated " + count + " rooms in mongo with webUntis information")
            } catch (ex) {
                this.log("error in updateRooms: " + ex);
                this.log("error object from request: " + error);
            }
        });

    }

    /**
     * Function for fetching list of elements from webUntis
     * @param type element type, 1 for classList, 4 for roomList
     */
    static fetchPageConfig(type, onDone) {
        let url = "http://ucn.brosa.dk/getPageConfig.php";//"https://webuntis.dk/WebUntis/Timetable.do?request.preventCache=";
        //this.log("### run fetchPageConfig ###");
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
        //this.log("### finish fetchPageConfig ###");
    }

    /**
     * Clean an element from webuntis for stuff, we don't need
     * @param element
     * @returns {{type, id, name, longName: *}}
     */
    static cleanElement(element) {
        return {
            type: element.type,
            id: element.id,
            name: element.name,
            longName: element.longName
        };
    }
}