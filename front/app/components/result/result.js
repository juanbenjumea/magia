(function() {

    'use strict';

    angular
        .module('app.result')
        .controller("Result", Result);
        
    Result.$inject = ['$uibModal', '$log', 'resultService'];

    function Result($uibModal, $log, resultService){
        var vm = this;

        // Bind variables
        vm.createResult = createResult;
        vm.modalOpenAddResult = modalOpenAddResult;
        vm.selectResult = selectResult;
        vm.toggleFlagNewResult = toggleFlagNewResult;
        vm.toggleTabResultOption = toggleTabResultOption;

        vm.result_selected = {};
        vm.new_result = {};
        vm.help_new_result = false;
        vm.flag_new_result = true;
        vm.tab_result_option = 0;

        activate();

        function activate(){
            return getResults();
        }

        function getResults(){
            return resultService.getResults().$promise
                    .then(getResultsComplete)
                    .catch(getResultsError);
                    
            function getResultsComplete(data , status, headers, config){
                return vm.results = data;
            }
            
            function getResultsError(error){
                console.log('error');
                console.log(error);
            }
        }

        function toggleFlagNewResult(value){
            vm.flag_new_result = value;
            vm.last_results = 0;
        }
        
        function toggleTabResultOption(value){
            vm.tab_result_option = (vm.tab_result_option === value)? 0 : value;
        }

        function createResult(){
            vm.btn_waiting_save_result = true;
            return resultService.createResult(vm.new_result).$promise
                    .then(createResultComplete)
                    .catch(createResultError);
                    
            function createResultComplete(data , status, headers, config){
                vm.new_result = {};
                vm.results.unshift(data);
                selectResult(data);
                vm.btn_waiting_save_result = false;
            }
            
            function createResultError(error){
                console.log('error');
                console.log(error);
            }
        }

        function selectResult(result){

            vm.flag_new_result = false;
            vm.result_phrase = '';

            if(typeof(result) !== 'undefined') {
                result.result_phrases = [];
                vm.result_selected = result;
            }
            else {
                vm.result_selected = JSON.parse(vm.last_results);
            }

            if(vm.result_selected.result_phrases.length > 0){
                vm.result_phrase = vm.result_selected.result_phrases[0].detail;
            }
        }


        /////////// TODO: Refactorizar
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




