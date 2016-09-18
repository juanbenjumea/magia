angular
    .module('magic')
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
            .when('/login', {
                controller: 'LoginController',
                controllerAs: 'vm',
                templateUrl: 'app/common/login/login.html',
            })
            .when('/result', {
                controller: 'ResultController',
                controllerAs: 'vm',
                templateUrl: 'app/components/result/result.html',
            })
            .when('/situation', {
            });
    }]);