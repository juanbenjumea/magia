angular
    .module('app.steps')
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
            .when('/steps/:result_id', {
                controller: 'Steps',
                controllerAs: 'vm',
                templateUrl: 'app/components/steps/steps.html'
            })
    }]);