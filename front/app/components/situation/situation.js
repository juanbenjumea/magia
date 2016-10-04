(function() {

    'use strict';

    angular
        .module('app.situation')
        .controller('Situation', Situation);

    Situation.$inject = ['$uibModal', '$log', '$routeParams', '$location', 'METHODS', 'situationService', 'resultService'];

    function Situation($uibModal, $log, $routeParams, $location, METHODS, situationService, resultService){
        var vm = this;

        vm.situations = [];
        vm.new_situation = {};
        vm.method_selected = {};
        vm.method_selected.name = $routeParams.method;
        vm.method_selected.id = METHODS[vm.method_selected.name.toUpperCase()];
        vm.flag_new_situation = false;
        vm.createSituation = createSituation;
        vm.goToPierce = goToPierce;
        vm.backToHome = backToHome;
        vm.result_id = $routeParams.result_id;

        activate($routeParams.result_id);

        function activate(result_id){
            getResult(result_id);
            getSituations(result_id);
        }

        function getSituations(result_id){
            return situationService.getSituations(result_id).$promise
                    .then(getResultsComplete)
                    .catch(getResultsError);

            function getResultsComplete(data , status, headers, config){
                return vm.situations = data;
            }

            function getResultsError(error){
                console.log(error);
            }
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
        
        function createSituation(){
            
            vm.btn_waiting_save_situation = true;
            vm.new_situation.result_id = vm.result_id;
            vm.new_situation.method_id = vm.method_selected.id;
            situationService.createSituation(vm.new_situation).$promise
                    .then(createSituationComplete)
                    .catch(createSituationError);
            
            function createSituationComplete(data, status, headers, config){
                
                data.methods = [{'id': vm.method_selected.id, 'name': vm.method_selected.name}];
                vm.situations.unshift(data);
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
        
        function goToPierce(situation_id){
            $location.path('/peirce/'+situation_id);
        }
        
        function backToHome(){
            $location.path('/result');
        }
        
        


        // TODO_MAGIA: Refactorizar
        function modalOpenAddResult(size) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/components/result/modals/result-new.html',
                controller: 'ResultNew',
                controllerAs: 'vm',
                size: size,
                resolve: {
                    items: function () {
                        return vm.items;
                    }
                }
            });

            // Callback cuando cierra 
            modalInstance.result.then(function (selectedItem) {
                // Con close()
                vm.selected = selectedItem;
                console.log('pasando');
            }, function () {
                // Con dismiss()
                $log.info('Modal dismissed at: ' + new Date());
            });
        }; 
    }
})();




