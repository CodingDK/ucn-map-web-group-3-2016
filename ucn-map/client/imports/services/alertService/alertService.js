import angular from 'angular';
import angularMeteor from 'angular-meteor';
import templateUrl from './alertService.html';

class AlertModal {
    constructor($uibModal, $sce) {
        'ngInject';
        this.show = function(title, content, size = "sm") {
            return $uibModal.open({
                templateUrl: templateUrl,
                controller: function($scope, $reactive) {
                    'ngInject';
                    $reactive(this).attach($scope);
                    this.title = $sce.trustAsHtml(title);
                    this.content = $sce.trustAsHtml(content);
                },
                size: size,
                controllerAs: 'ctrl'
            });
        }
    }
}

const name = 'alertService';

// create a module
export default angular.module(name, [
    angularMeteor
]).service(name, AlertModal);