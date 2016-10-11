(function() {

    'use strict';

    angular
        .module('app.peirce')
        .controller('Thesis', Thesis);

    Thesis.$inject = ['$uibModalInstance', 'peirceService', 'data'];

    function Thesis($uibModalInstance, peirceService, data){

        var vm = this;
        vm.analysis = data.analysis;
        vm.quadrant = data.quadrant;
        vm.getThesis = getThesis;
        vm.createThesis = createThesis;
        vm.dismiss = dismiss;
        vm.thesis = [];

        activate();

        function activate(){
            getThesis();
        }

        function getThesis(){
            return peirceService.getThesis(vm.analysis.id).$promise
                    .then(getThesisComplete)
                    .catch(getThesisError);

            function getThesisComplete(data , status, headers, config){
                angular.forEach(data, function(thesis, id) {
                    vm.thesis[thesis.quadrant_id] = thesis.detail;
                });

                return;
            }

            function getThesisError(error){
                console.log(error);
            }
        }

        function createThesis(){

            var new_thesis = {};
            new_thesis.analysis_id = vm.analysis.id;
            new_thesis.thesis = vm.thesis;

            peirceService.createThesis(new_thesis).$promise
                    .then(createThesisComplete)
                    .catch(createThesisError);

            function createThesisComplete(data, status, headers, config){
                $uibModalInstance.close(data);
            }
            
            function createThesisError(error){
                console.log(error);
                dismiss();
            }
        }

        function dismiss() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();