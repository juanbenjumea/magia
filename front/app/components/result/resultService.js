(function() {

    'use strict';

    angular
        .module('magic')
        .factory('resultService', ['$resource', 'API_URL', resultService]);

    function resultService($resource, API_URL){
        
        var service = {
            getResults : getResults,
            createResult : createResult
        };
        return service;

        function getResults(){
            var Result = $resource(API_URL + "result");
            return Result.query();
        }

        function createResult(new_result) {
            var Result = $resource(API_URL + "result");
            Result.save(new_result);
        }
    }
})();