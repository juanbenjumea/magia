(function() {

    'use strict';

    angular
        .module('app.report')
        .controller('Report', Report);

    Report.$inject = ['$uibModal', '$log', '$routeParams', '$location', 'situationService', 'resultService'];

    function Report($uibModal, $log, $routeParams, $location, situationService, resultService){
        var vm = this;

        vm.results = [];

        activate();

        function activate(){
            return getResults();
        }
        
        function getResults(){
            return resultService.getResults().$promise
                    .then(getResultsComplete)
                    .catch(getResultsError);
                    
            function getResultsComplete(data , status, headers, config){
                console.log(data);
                return vm.results = data;
            }
            
            function getResultsError(error){
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




