angular
    .module('app.core')
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
            .when('/login', {
                controller: 'Login',
                controllerAs: 'vm',
                templateUrl: 'app/core/login/login.html',
            })
    }]);