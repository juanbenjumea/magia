(function() {

    'use strict';

    angular
        .module('magic')
        .controller("ResultController",
            ['$resource', 'API_URL', 'resultService'
            , ResultController]);
        
    function ResultController($resource, API_URL, resultService){
        var vm = this;

        // Bind variables
        vm.result_selected = [];
        vm.selectResult = selectResult;

        ini();

        function ini(){
            vm.results = getResults();
            console.log(vm.results);
        }

        function getResults(){
            return resultService.getResults();
        }
        
        function selectResult(){
            console.log("selectResult");
            console.log(vm.result_selected);
        }
    }
})();