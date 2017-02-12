(function() {

    'use strict';

    angular
        .module('app.peirce')
        .factory('peirceService', peirceService);

    peirceService.$inject = ['$resource', 'API_URL'];

    function peirceService($resource, API_URL){

        var service = {
            getLogics : getLogics,
            getAnalysis : getAnalysis,
            getHypothesis : getHypothesis,
            getThesis : getThesis,
            createAnalysis : createAnalysis,
            createHypothesis : createHypothesis,
            createThesis : createThesis,
            updateAnalysis : updateAnalysis
        };
        return service;

        function getAnalysis(situation_id){
            var Analysis = $resource(API_URL + 'analysis');
            return Analysis.query({'situation_id':situation_id});
        }

        function createAnalysis(new_analysis) {
            var Analysis = $resource(API_URL + 'analysis');
            return Analysis.save(new_analysis);
        }
        
        function getHypothesis(analysis_id){
            var Hypothesis = $resource(API_URL + 'hypothesis');
            return Hypothesis.query({'analysis_id':analysis_id});
        }

        function createHypothesis(new_hypothesis) {
            var Hypothesis = $resource(API_URL + 'hypothesis');
            return Hypothesis.save(new_hypothesis);
        }

        function getThesis(analysis_id){
            var Thesis = $resource(API_URL + 'thesis');
            return Thesis.query({'analysis_id':analysis_id});
        }

        function createThesis(new_thesis) {
            console.log('serv crear tesis');
            var Thesis = $resource(API_URL + 'thesis');
            return Thesis.save(new_thesis);
        }

        function updateAnalysis(analysis, id) {
            console.log(analysis);
            var Analysis = $resource(API_URL + 'analysis/:id', {id : '@id'}, {'update': { method:'PUT' }});
            return Analysis.update({'id': id}, analysis);
        }

        function getLogics(){
            var Logics = $resource(API_URL + 'logic-type');
            return Logics.query();
        }
    }
})();