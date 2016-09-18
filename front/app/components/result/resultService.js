(function() {

    'use strict';

    angular
        .module('magic')
        .factory('resultService', ['$resource', 'API_URL', resultService]);

    function resultService($resource, API_URL){
        
        var service = {
            getResults : getResults
        };
        return service;
        
        function getResults(){
            var Result = $resource(API_URL + "result");
            return Result.query();
        }
        
    }
})();