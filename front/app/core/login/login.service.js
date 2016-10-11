(function () {
    
    'use strict';

    angular
        .module('app.core')
        .factory('loginService', loginService);

    loginService.$inject = ['$resource', 'API_URL', '$location', '$window'];

    function loginService($resource, API_URL, $location, $window) {
        var service = {
            getLogin: getLogin,
            requireAuthentication: requireAuthentication 
        };

        return service;

        function getLogin(data) {

            var Login = $resource(API_URL + 'api/authenticate');
            return Login.save(data);
        }
        
        function requireAuthentication(){
            
            var user = $window.sessionStorage.token;

            if (!user.token === '') {
                $location.path('/login');
            }
        }
    }
})();
