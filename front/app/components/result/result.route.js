angular
    .module('app.result')
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
            .when('/result', {
                controller: 'Result',
                controllerAs: 'vm',
                templateUrl: 'app/components/result/result.html',
            })
    }]);