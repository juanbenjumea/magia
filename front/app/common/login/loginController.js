(function(){
    
    'use strict'
    
    angular
        .module('magic')
        .controller('LoginController', LoginController);

    function LoginController(){
        
        var vm = this;
        
        vm.login = login;
        
        function login(){
            
            console.log('login');
        }
    }
})();

