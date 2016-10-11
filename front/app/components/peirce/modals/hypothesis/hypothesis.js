(function() {

    'use strict';

    angular
        .module('app.peirce')
        .controller('Hypothesis', Hypothesis);

    Hypothesis.$inject = ['$uibModalInstance', 'peirceService', 'data'];

    function Hypothesis($uibModalInstance, peirceService, data){

        var vm = this;
        vm.analysis = data.analysis;
        vm.quadrant = data.quadrant;
        vm.getHypothesis = getHypothesis;
        vm.createHypothesis = createHypothesis;
        vm.dismiss = dismiss;
        vm.hypothesis = [];

        activate();

        function activate(){
            getHypothesis();
        }

        function getHypothesis(){
            return peirceService.getHypothesis(vm.analysis.id).$promise
                    .then(getHypothesisComplete)
                    .catch(getHypothesisError);

            function getHypothesisComplete(data , status, headers, config){
                
                angular.forEach(data, function(hypothesis, id) {
                    vm.hypothesis[hypothesis.quadrant_id] = hypothesis.detail;
                });

                return;
            }

            function getHypothesisError(error){
                console.log(error);
            }
        }

        function createHypothesis(){

            var new_hypothesis = {};
            new_hypothesis.analysis_id = vm.analysis.id;
            new_hypothesis.hypothesis = vm.hypothesis;

            peirceService.createHypothesis(new_hypothesis).$promise
                    .then(createHypothesisComplete)
                    .catch(createHypothesisError);

            function createHypothesisComplete(data, status, headers, config){
                data.quadrant = vm.quadrant;
                $uibModalInstance.close(data);
            }
            
            function createHypothesisError(error){
                console.log(error);
                dismiss();
            }
        }

        function dismiss() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();