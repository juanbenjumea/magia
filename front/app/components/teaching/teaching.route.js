angular
    .module('app.teaching')
    .config(['$routeProvider', function ($routeProvider) {
    
        $routeProvider
            .when('/teaching', {
                controller: 'Teaching',
                controllerAs: 'vm',
                templateUrl: 'app/components/teaching/teaching.html',
                resolve: {
                    'login' : function(loginService){
                        loginService.requireAuthentication();
                    }
                }
            })
            .when('/teaching/user/:user_id', {
                controller: 'Teaching',
                controllerAs: 'vm',
                templateUrl: 'app/components/teaching/user.html',
                resolve: {
                    'login' : function(loginService){
                        loginService.requireAuthentication();
                    }
                }
            });
    }]);