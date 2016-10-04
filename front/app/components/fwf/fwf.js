(function() {

    'use strict';

    angular
        .module('app.fwf')
        .controller('Fwf', Fwf);

    Fwf.$inject = ['$uibModal', '$log', '$routeParams', '$location', 'situationService', 'fwfService'];

    function Fwf($uibModal, $log, $routeParams, $location, situationService, fwfService){
        var vm = this;

        vm.situations = [];
        vm.method_selected = $routeParams.method;
        vm.flag_new_situation = false;

        activate($routeParams.result_id);

        function activate(result_id){
            getFwfs();
        }

        function getFwfs(){
            return fwfService.getFwfs().$promise
                    .then(getFwfsComplete)
                    .catch(getFwfsError);

            function getFwfsComplete(data , status, headers, config){
                console.log(data);
                return vm.fwfs = data;
            }

            function getFwfsError(error){
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




