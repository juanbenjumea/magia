(function() {

    'use strict';

    angular
        .module('app.situation')
        .controller('Situation', Situation);

    Situation.$inject = ['$uibModal', '$log', '$routeParams', 'situationService', 'resultService'];

    function Situation($uibModal, $log, $routeParams, situationService, resultService){
        var vm = this;

        vm.situations = [];
        vm.method_selected = $routeParams.method;

        console.log(vm.method_selected);

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




