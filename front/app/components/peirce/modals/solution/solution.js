(function() {

    'use strict';

    angular
        .module('app.peirce')
        .controller('Solution', Solution);

    Solution.$inject = ['$uibModalInstance', 'situationService', 'data'];

    function Solution($uibModalInstance, situationService, data){

        console.log(data);
        var vm = this;
        vm.situation = data.situation;
        vm.method = data.method;
        vm.getSolution = getSolution;
        vm.createSolution = createSolution;
        vm.dismiss = dismiss;
        vm.new_solution = {};

        activate();

        function activate(){
            if(vm.situation.solution.length){
                getSolution();
            }   
        }

        function getSolution(){

            return situationService.getSolution(vm.situation.solution[0].id).$promise
                    .then(getSolutionComplete)
                    .catch(getSolutionError);

            function getSolutionComplete(data , status, headers, config){
                console.log('solution');
                console.log(data);
                return vm.new_solution = data;
            }

            function getSolutionError(error){
                console.log(error);
            }
        }

        function createSolution(){

            vm.new_solution.situation_id = vm.situation.id;
            vm.new_solution.method_id = vm.method;
            console.log(vm.new_solution);

            situationService.createSolution(vm.new_solution).$promise
                    .then(createSolutionComplete)
                    .catch(createSolutionError);

            function createSolutionComplete(data, status, headers, config){
                $uibModalInstance.close(data);
            }
            
            function createSolutionError(error){
                console.log(error);
                dismiss();
            }
        }

        function dismiss() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();