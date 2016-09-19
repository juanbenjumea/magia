(function() {

    'use strict';

    angular
        .module('magic')
        .controller("ResultController",
            ['$resource', '$uibModal', '$log', 'API_URL', 'resultService'
            , ResultController]);
        
    function ResultController($resource, $uibModal, $log, API_URL, resultService){
        var vm = this;

        // Bind variables
        vm.result_selected = {};
        vm.new_result = {};
        vm.createResult = createResult;
        vm.selectResult = selectResult;
        vm.modalOpenAddResult = modalOpenAddResult;
        vm.open = open;

        vm.help_new_result = false;
        vm.new = true;

        ini();

        function ini(){
            vm.results = getResults();
            console.log(vm.results);
        }

        function getResults(){
            return resultService.getResults();
        }

        function createResult(){
            resultService.createResult(vm.new_result);
        }

        function selectResult(){
            vm.new = false;
            vm.result_selected = JSON.parse(vm.last_results);
            console.log(vm.last_results);
            console.log(vm.result_selected);
            //resultService.setResultSelected(vm.result_selected);
        }

        function modalOpenAddResult(size) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/components/result/modals/newResult.html',
                controller: 'NewResult',
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




