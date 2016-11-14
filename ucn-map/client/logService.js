import angular from 'angular';
import angularMeteor from 'angular-meteor';

const name = 'logToServer';

export default angular.module(name, [angularMeteor])
    .service('$log', function () {
        this.log = function (msg) {
            Meteor.call('jlLog', [msg]);
        }
        this.debug = function (msg) {
            Meteor.call('jlDebug', [msg]);
        }
        this.info = function (msg) {
            Meteor.call('jlInfo', [msg]);
        }
        this.warn = function (msg) {
            Meteor.call('jlWarn', [msg]);
        }
        this.error = function (msg) {
            Meteor.call('jlError', [msg]);
        }
    })
    .factory('$exceptionHandler', function () {
        return function (exception, cause) {
            Meteor.call('jlFatalException', [cause, exception]);
            throw exception;
        }
    })
    .factory('logToServerInterceptor', ['$q', function ($q) {
        var myInterceptor = {
            'request': function (config) {
                config.msBeforeAjaxCall = new Date().getTime();
                return config;
            },
            'response': function (response) {
                if (response.config.warningAfter) {
                    var msAfterAjaxCall = new Date().getTime();
                    var timeTakenInMs =
                        msAfterAjaxCall - response.config.msBeforeAjaxCall;
                    if (timeTakenInMs > response.config.warningAfter) {
                        Meteor.call('jlAjaxWarn', [timeTakenInMs, response]);
                    }
                }
                return response;
            },
            'responseError': function (rejection) {
                var errorMessage = "timeout";
                if (rejection && rejection.status && rejection.data) {
                    errorMessage = rejection.data.ExceptionMessage;
                }
                Meteor.call('jlAjaxFatalException', [errorMessage, rejection]);

                return $q.reject(rejection);
            }
        };
        return myInterceptor;
    }]);