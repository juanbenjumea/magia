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
            updateResult : updateResult,
            createResultPhrase : createResultPhrase,
            updateResultPhrase : updateResultPhrase,
            createDeviation : createDeviation,
            updateDeviation : updateDeviation,
            completeResult : completeResult,
            createFailed : createFailed
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

        function updateResult(result, id) {
            var Result = $resource(API_URL + 'result/:id', {id : '@id'}, {'update': { method:'PUT' }});
            return Result.update({'id': id}, result);
        }

        function completeResult(id) {
            var result = {'completed' : 1}
            var Result = $resource(API_URL + 'result/:id', {id : '@id'}, {'update': { method:'PUT' }});
            return Result.update({'id': id}, result);
        }

        function createResultPhrase(new_result_phrase) {
            var ResultPhrase = $resource(API_URL + 'result-phrase');
            return ResultPhrase.save(new_result_phrase);
        }

        function updateResultPhrase(result_phrase, id) {
            var ResultPhrase = $resource(API_URL + 'result-phrase/:id', {id : '@id'}, {'update': { method:'PUT' }});
            return ResultPhrase.update({'id': id}, result_phrase);
        }

        function createDeviation(deviation) {
            var Deviation = $resource(API_URL + 'deviation');
            return Deviation.save(deviation);
        }

        function updateDeviation(deviation, id){
            var Deviation = $resource(API_URL + 'deviation/:id', {id : '@id'}, {'update': { method:'PUT' }});
            return Deviation.update({'id': id}, deviation);
        }
        
        function createFailed(failed) {
            var Failed = $resource(API_URL + 'failed');
            return Failed.save(failed);
        }

    }
})();