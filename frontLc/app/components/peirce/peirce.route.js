angular
    .module('app.peirce')
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
            .when('/peirce/:situation_id', {
                controller: 'Peirce',
                controllerAs: 'vm',
                templateUrl: 'app/components/peirce/peirce.html',
            })
    }]);