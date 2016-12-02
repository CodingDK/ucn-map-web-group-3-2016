import { Meteor } from 'meteor/meteor';

import {Rooms} from '../../../imports/collections/rooms';

Meteor.publish('rooms', function() {
    return Rooms.find({});
});
