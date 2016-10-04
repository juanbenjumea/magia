(function() {

    'use strict';

    angular
        .module('app.situation')
        .factory('situationService', situationService);

    situationService.$inject = ['$resource', 'API_URL'];

    function situationService($resource, API_URL){

        var service = {
            getSituation : getSituation,
            getSituations : getSituations,
            createSituation : createSituation,
            updateSituation : updateSituation
        };
        return service;

        function getSituation(id){
            var Situation = $resource(API_URL + 'situation/:id', {id : '@id'});
            return Situation.get({'id' : id});            
        }

        function getSituations(result_id){
            var Situation = $resource(API_URL + 'situation');
            return Situation.query({'result_id':result_id});
        }

        function createSituation(new_situation) {
            var Situation = $resource(API_URL + 'situation');
            return Situation.save(new_situation);
        }

        function updateSituation(situation, id) {
            var Situation = $resource(API_URL + 'situation/:id', {id : '@id'}, {'update': { method:'PUT' }});
            return Situation.update({'id': id}, situation);
        }
    }
})();