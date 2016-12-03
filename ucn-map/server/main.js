import { Meteor } from 'meteor/meteor';
//import { } from "../imports/logger";
import {insertTestData} from './imports/data/insertScript';
import {WebUntisCtrl} from './imports/controllers/webUntis';

Meteor.startup(() => {
  // code to run on server at startup
    Kadira.connect('7NJFMudktKcn2TFRS', '11f6c042-0f83-4c4e-a9a5-4e06ba9c0dd2');
    //logger.info("test?");
    insertTestData();
    let webUntisCtr = new WebUntisCtrl();
    webUntisCtr.checkWebUntisInformation();
});
