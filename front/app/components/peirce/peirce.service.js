(function() {

    'use strict';

    angular
        .module('app.peirce')
        .factory('peirceService', peirceService);

    peirceService.$inject = ['$resource', 'API_URL'];

    function peirceService($resource, API_URL){

        var service = {
            getAnalysis : getAnalysis,
            createAnalysis : createAnalysis,
            updateAnalysis : updateAnalysis
        };
        return service;

        function getAnalysis(situation_id){
            var Analysis = $resource(API_URL + 'analysis');
            return Analysis.query({'situation_id':situation_id});
        }

        function createAnalysis(new_situation) {
            var Situation = $resource(API_URL + 'situation');
            return Situation.save(new_situation);
        }

        function updateAnalysis(situation, id) {
            var Situation = $resource(API_URL + 'situation/:id', {id : '@id'}, {'update': { method:'PUT' }});
            return Situation.update({'id': id}, situation);
        }
    }
})();