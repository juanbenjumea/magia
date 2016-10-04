(function() {

    'use strict';

    angular
        .module('app.peirce')
        .controller('Peirce', Peirce);

    Peirce.$inject = ['$uibModal', '$log', '$routeParams', '$location', 'situationService', 'peirceService'];

    function Peirce($uibModal, $log, $routeParams, $location, situationService, peirceService){
        var vm = this;

        vm.flag_view_all_analysis = false;
        vm.backToResult = backToResult;
        activate($routeParams.situation_id);

        function activate(situation_id){
            getSituation(situation_id);
            getAnalysis(situation_id);
        }
        
        function getAnalysis(situation_id){
            return peirceService.getAnalysis(situation_id).$promise
                    .then(getAnalysisComplete)
                    .catch(getAnalysisError);

            function getAnalysisComplete(data , status, headers, config){
                console.log(data);
                return vm.analysis = data;
            }

            function getAnalysisError(error){
                console.log(error);
            }
        }

        function getSituation(situation_id){

            return situationService.getSituation(situation_id).$promise
                    .then(getSituationComplete)
                    .catch(getSituationError);
                    
            function getSituationComplete(data , status, headers, config){
                return vm.situation = data;
            }
            
            function getSituationError(error){
                console.log(error);
            }
        }
        
        function backToResult(){
            $location.path('/situation/peirce/'+vm.situation.result_id);
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




