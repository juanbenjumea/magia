angular
    .module('app.fwf')
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
            .when('/fwf', {
                controller: 'Fwf',
                controllerAs: 'vm',
                templateUrl: 'app/components/fwf/fwf.html',
            })
    }]);