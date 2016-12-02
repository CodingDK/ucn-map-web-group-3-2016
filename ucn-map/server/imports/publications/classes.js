import { Meteor } from 'meteor/meteor';

import {Classes} from '../../../imports/collections/classes';

Meteor.publish('classes', function() {
    return Classes.find({});
});