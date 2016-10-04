angular
    .module('app.report')
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
            .when('/report', {
                controller: 'Report',
                controllerAs: 'vm',
                templateUrl: 'app/components/report/report.html',
            })
    }]);