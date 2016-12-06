import { Meteor } from 'meteor/meteor';

import {Sessions} from '../../../imports/collections/sessions';

Meteor.publish('sessions', function() {
    return Sessions.find({});
});
