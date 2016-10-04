(function() {

    'use strict';

    angular
        .module('app.result')
        .factory('resultService', resultService);

    resultService.$inject = ['$resource', '$http', 'API_URL'];

    function resultService($resource, $http, API_URL){

        var service = {
            getResult : getResult,
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

        function getResult(id){
            var Result = $resource(API_URL + 'result/:id', {id : '@id'});
            return Result.get({'id' : id});            
        }

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
            return Result.update({'id' : id}, result);
        }

        function completeResult(id) {
            var result = {'completed' : 1}
            var Result = $resource(API_URL + 'result/:id', {id : '@id'}, {'update': { method:'PUT' }});
            return Result.update({'id' : id}, result);
        }

        function createResultPhrase(new_result_phrase) {
            var ResultPhrase = $resource(API_URL + 'result-phrase');
            return ResultPhrase.save(new_result_phrase);
        }

        function updateResultPhrase(result_phrase, id) {
            var ResultPhrase = $resource(API_URL + 'result-phrase/:id', {id : '@id'}, {'update': { method:'PUT' }});
            return ResultPhrase.update({'id' : id}, result_phrase);
        }

        function createDeviation(deviation) {
            var Deviation = $resource(API_URL + 'deviation');
            return Deviation.save(deviation);
        }

        function updateDeviation(result_phrase, id){
            var ResultPhrase = $resource(API_URL + 'result-phrase/:id', {id : '@id'}, {'update': { method:'PUT' }});
            return ResultPhrase.update({'id' : id}, result_phrase);
        }
        
        function createFailed(failed) {
            var Failed = $resource(API_URL + 'failed');
            return Failed.save(failed);
        }

    }
})();