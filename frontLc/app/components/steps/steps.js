(function() {

    'use strict';

    angular
        .module('app.steps')
        .controller('Steps', Steps);

    Steps.$inject = ['$uibModal', '$log', '$routeParams', '$location', 'stepsService', 'resultService', 'situationService'];

    function Steps($uibModal, $log, $routeParams, $location, stepsService, resultService, situationService){
        var vm = this;
        vm.result_id = $routeParams.result_id;
        vm.backToHome = backToHome;
        vm.createSituation = createSituation;
        vm.editSituation = editSituation;
        vm.cancelEditSituation = cancelEditSituation;
        vm.steps = [];
        
        activate();

        function activate(){
            console.log('cargar '+vm.result_id);
            getResult(vm.result_id);
            getSteps(vm.result_id);
        }

        function getResult(result_id){

            return resultService.getResult(result_id).$promise
                    .then(getResultComplete)
                    .catch(getResultError);
                    
            function getResultComplete(data , status, headers, config){
                return vm.result = data;
            }
            
            function getResultError(error){
                console.log(error);
            }
        }
        
        function getSteps(result_id){

            return stepsService.getSteps(result_id).$promise
                    .then(getStepsComplete)
                    .catch(getStepsError);
                    
            function getStepsComplete(data , status, headers, config){
                console.log(data);
                return vm.steps = data;
            }
            
            function getStepsError(error){
                console.log(error);
            }
        }
        
        function createSituation(){
            vm.btn_waiting_save_situation = true;
            vm.new_situation.result_id = vm.result_id;
            vm.new_situation.method_id = 3;
            situationService.createSituation(vm.new_situation).$promise
                    .then(createSituationComplete)
                    .catch(createSituationError);
            
            function createSituationComplete(data, status, headers, config){
                console.log(data);
                getSteps(vm.result_id);
                vm.new_situation = {};
                vm.flag_new_situation = false;
                vm.btn_waiting_save_situation = false;
            }

            function createSituationError(error){
                if(error.data.message){
                    alert(error.data.message);
                    vm.btn_waiting_save_situation = false;
                }
            }
        }
        
        function editSituation(situation){
            console.log(situation);
            vm.flag_new_situation = true;
            vm.new_situation = situation; 
        }
        
        function cancelEditSituation(){
            vm.new_situation = {};
            vm.flag_new_situation = false;
        }
        
        function backToHome(){
            $location.path('/result');
        }
    }
})();




