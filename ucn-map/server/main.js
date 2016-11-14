import { Meteor } from 'meteor/meteor';
import { JL } from 'jsnlog';

Meteor.startup(() => {
  // code to run on server at startup
    JL().info('DOM loaded');
});

Meteor.methods({
    logError: function (errorMsg, url, lineNumber, column, errorObj) {
        JL("onerrorLogger").fatalException({
            "msg": "Uncaught Exception",
            "errorMsg": errorMsg, "url": url,
            "line number": lineNumber, "column": column
        }, errorObj);
    },
    jlLog: function (msg) {
        JL('Angular').trace(msg);
    },
    jlDebug: function (msg) {
        JL('Angular').debug(msg);
    },
    jlInfo: function (msg) {
        JL('Angular').info(msg);
    },
    jlWarn: function (msg) {
        JL('Angular').warn(msg);
    },
    jlError: function (msg) {
        JL('Angular').error(msg);
    },
    jlFatalException: function (cause, exception) {
        JL('Angular').fatalException(cause, exception);
    },
    jlAjaxWarn: function (timeTakenInMs, response) {
        JL('Angular.Ajax').warn({
            timeTakenInMs: timeTakenInMs,
            config: response.config,
            data: response.data });
    },
    jlAjaxFatalException: function (errorMessage, rejection) {
        JL('Angular.Ajax').fatalException({
            errorMessage: errorMessage,
            status: rejection.status,
            config: rejection.config }, rejection.data);
    }

});