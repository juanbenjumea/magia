(function() {

    'use strict';

    angular
        .module('app.result')
        .factory('resultService', resultService);

    resultService.$inject = ['$resource', 'API_URL'];

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
            return Result.save(new_result);
        }
    }
})();