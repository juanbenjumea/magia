(function(){
    
    'use strict'
    
    angular
        .module('app.core')
        .controller('Login', Login);

    Login.$inject = ['$resource', 'API_URL', 'loginService', '$window', '$location'];

    function Login($resource, API_URL, loginService, $window, $location){

        var vm = this;
        
        vm.login = login;
        vm.login_data = {};
        
        function login(){

            return loginService.getLogin(vm.login_data).$promise
                    .then(getLoginComplete)
                    .catch(getLoginError);
                    
            function getLoginComplete(data , status, headers, config){

                $window.sessionStorage.token = data.token;
                $location.path('/result');
                return data;
            }
            
            function getLoginError(error){
                console.log(error);
            }
        }
    }
})();

