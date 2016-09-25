angular
    .module('app.situation')
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
            .when('/situation/:method/:result_id', {
                controller: 'Situation',
                controllerAs: 'vm',
                templateUrl: 'app/components/situation/situation.html',
            })
    }]);