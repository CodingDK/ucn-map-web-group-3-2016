/*
    The real Gulpfile.js is in .gulp/realGulpfile.js
    This is just a workaround for an meteor issue. See link for more info:
    https://www.trajano.net/2016/04/using-gulp-with-meteor/
 */
if (typeof Meteor === typeof undefined) {
    var r = require
    r('./.gulp/realGulpfile')
}