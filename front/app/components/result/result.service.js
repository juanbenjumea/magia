(function() {

    'use strict';

    angular
        .module('app.result')
        .factory('resultService', resultService);

    resultService.$inject = ['$resource', 'API_URL'];

    function resultService($resource, API_URL){

        var service = {
            getResults : getResults,
            createResult : createResult,
            createResultPhrase : createResultPhrase,
            updateResultPhrase : updateResultPhrase
        };
        return service;

        function getResults(){
            var Result = $resource(API_URL + 'result');
            return Result.query();
        }

        function createResult(new_result) {
            var Result = $resource(API_URL + 'result');
            return Result.save(new_result);
        }

        function createResultPhrase(new_result_phrase) {
            var ResultPhrase = $resource(API_URL + 'result-phrase');
            return ResultPhrase.save(new_result_phrase);
        }

        function updateResultPhrase(result_phrase, id) {
            console.log('actualizar '+id+' con');
            console.log(result_phrase);
            var ResultPhrase = $resource(API_URL + "result-phrase/:id", {id : '@id'}, {'update': { method:'PUT' }});
            return ResultPhrase.update({'id': id}, result_phrase);
            
            $http({
                method: 'PUT',
                url: API_URL + "result-phrase",
                headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
                data: $.param(commentData)
            });
        }
    }
})();