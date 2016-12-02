import {Meteor} from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import {Classes} from '../../../imports/collections/classes';

export class WebUntisCtrl {

    checkClassList() {
        //console.log("### checkClassList ###");
        var classesCount = Classes.find().count();
        if (classesCount === 0) {
            this.updateClassList();
        } else {
            console.log("Classes are already in mongoDB");
        }
    }

    updateClassList() {
        var url = "http://ucn.brosa.dk/getPageConfig.php";//"https://webuntis.dk/WebUntis/Timetable.do?request.preventCache=";
        //console.log("### run updateClassList ###");
        var headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:50.0) Gecko/20100101 Firefox/50.0'
        };
        HTTP.post(
            url, {
                params: {
                    type: "1",
                    ajaxCommand: "getPageConfig",
                    filter: "-2"
                },
                headers: headers
            },
            function doneGettingClassList(error, result) {
                //console.log("error: ", error);
                try {
                    var classList = result.data.elements.map(function (e) {
                        return {
                            type: e.type,
                            id: e.id,
                            name: e.name,
                            longName: e.longName
                        };
                    });
                    //console.log("classList: ", classList);
                    var removed = Classes.remove({});
                    console.log("removed: " + removed + " classes from mongoDb");
                    var count = 0;
                    classList.forEach((room) => {
                        Classes.insert(room);
                        count+=1;
                    });
                    console.log("inserted " + count + " classes in mongo");

                } catch (ex) {
                    console.log("error in updateClassList: " + ex);
                }
            }
        );

        //console.log("### finish updateClassList ###");
    }

}