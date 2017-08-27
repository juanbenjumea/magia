(function() {

    'use strict';

    angular
        .module('app.result')
        .factory('resultService', resultService);

    resultService.$inject = ['$resource', '$http', 'API_URL', '$window'];

    function resultService($resource, $http, API_URL, $window){

        var service = {
            getResult : getResult,
            getResults : getResults,
            createResult : createResult,
            createIntegration : createIntegration,
            updateResult : updateResult,
            deleteResult : deleteResult,
            createResultPhrase : createResultPhrase,
            updateResultPhrase : updateResultPhrase,
            deleteResultPhrase : deleteResultPhrase,
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
            var token = $window.sessionStorage.token;
            var Result = $resource(API_URL + 'result');
            return Result.query({'token':token});
        }

        function createResult(new_result) {
            var token = $window.sessionStorage.token;
            new_result.token = token;
            var Result = $resource(API_URL + 'result');
            return Result.save(new_result);
        }

        function updateResult(result, id) {
            var Result = $resource(API_URL + 'result/:id', {id : '@id'}, {'update': { method:'PUT' }});
            return Result.update({'id' : id}, result);
        }
        
        function createIntegration(new_integration, result_id){
            var Result = $resource(API_URL + 'result/:id', {id : '@id'}, {'update': { method:'PUT' }});
            return Result.update({'id' : result_id}, new_integration);
        }

        function completeResult(id) {
            var result = {'completed' : 1};
            var token = $window.sessionStorage.token;
            result.token = token;
            var Result = $resource(API_URL + 'result/:id', {id : '@id'}, {'update': { method:'PUT' }});
            return Result.update({'id' : id}, result);
        }

        function deleteResult(id) {
            var Result = $resource(API_URL + 'result/:id', {id : '@id'});
            return Result.delete({'id' : id});
        }

        function createResultPhrase(new_result_phrase) {
            var ResultPhrase = $resource(API_URL + 'result-phrase');
            return ResultPhrase.save(new_result_phrase);
        }

        function updateResultPhrase(result_phrase, id) {
            var ResultPhrase = $resource(API_URL + 'result-phrase/:id', {id : '@id'}, {'update': { method:'PUT' }});
            return ResultPhrase.update({'id' : id}, result_phrase);
        }

        function deleteResultPhrase(id) {
            var ResultPhrase = $resource(API_URL + 'result-phrase/:id', {id : '@id'});
            return ResultPhrase.delete({'id' : id});
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