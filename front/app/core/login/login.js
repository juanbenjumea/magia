(function(){
    
    'use strict'
    
    angular
        .module('app.core')
        .controller('Login', Login);

    function Login(){

        var vm = this;
        
        vm.login = login;
        
        function login(){
            
            console.log('login');
        }
    }
})();

