import angular from 'angular';
import angularMeteor from 'angular-meteor';
//class LogModule {}

const name = 'logModule';

// create a module
export default angular.module(name, [angularMeteor])
.provider('$exceptionHandler', {
    $get: function( errorLogService ) {
        return( errorLogService );
    }
})
.factory('errorLogService', ['$log', '$window', function($log, $window) {
    function log( exception ) {
        $log.error.apply( $log, arguments );
        //$log.log( exception );
        throw exception;
    }
    return( log );
}]);